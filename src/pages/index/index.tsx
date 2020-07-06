import Taro, { Config } from '@tarojs/taro'
import { View, Input, Image, Text, ScrollView } from '@tarojs/components'
import Timer from '../../utils/timer'
import Layout from '../../layouts/layout'
import { bindActionCreators } from 'redux'
import { connect } from '@tarojs/redux'
import MyComponent from '../../utils/component'

import './index.scss'

import searchIcon from '../../assets/icons/search.svg'
import closeIcon from '../../assets/icons/close.svg'
import clearIcon from '../../assets/icons/clear.svg'
import loadingIcon from '../../assets/icons/loading-black.svg'

import * as Actions from '../../actions/search'
import History from '../../utils/history'
import { Suggestion } from '../../models/suggestion'

function mapStateToProps(state: any) {
  return {
    search: state.search.toJS()
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    ...bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends MyComponent<any, any> {
  protected timer: Timer = Timer.delay(500)

  protected history = new History<String>('dict.history')

  constructor(props) {
    super(props)

    this.state = {
      suggestions: new Array<Suggestion>(),
      suggestionsLoading: false,
    }
  }

  componentWillUnmount () {
    this.timer.clear()
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    usingComponents: {
      'Layout': '../../layouts/layout'
    }
  }

  onInput(e: any) {
    const { setText } = this.props
    setText(e.detail.value)

    this.timer.clear()
    this.setState({
      suggestions: new Array<Suggestion>(),
      suggestionsLoading: false,
    })

    if (e.detail.value.length > 3) {
      const vm = this
      this.timer.run(() => {
        vm.setState({suggestionsLoading: true})
        this.$request({
          url: 'https://translator-api.dongnan.xin/v1/api/suggest',
          data: { q: e.detail.value },
          success: (res) => {
            if (res.statusCode == 200) {
              if (res.data.code != undefined && res.data.code === 0 && this.state.suggestionsLoading) {
                vm.setState({suggestions: res.data.data})
              }
            }
          },
          complete: () => {
            vm.setState({suggestionsLoading: false})
          }
        }, false)
      })
    }
  }

  onConfirm() {
    const { search: { text } } = this.props

    if (text.length == 0) {
      return
    }

    this.$request({
      url: 'https://translator-api.dongnan.xin/v1/api/youdao',
      data: {
        q: text
      },
      success: (res: any) => {
        if (res.statusCode === 200) {
          this.history.add(text)
          Taro.navigateTo({
            url: 'result',
            success: (page: any) => {
              page.eventChannel.emit('acceptData', res.data)
            }
          })
        }
      }
    })
  }

  onClearTapped() {
    const { reset } = this.props
    setTimeout(() => {
      reset()
      this.setState({suggestions: new Array<Suggestion>()})
    }, 60)
  }

  query(q: String) {
    const { setText } = this.props
    setText(q)
    this.onConfirm()
  }

  protected renderHistory() {
    let className = 'history'
    const values = this.history.all() || []

    if (values.length == 0) {
      className += ' no-history'
    }

    const items = values.map((h, i) => {
      return (
        <View className='item' key={String(i)} onClick={() => this.query(h)}>
          <Text>{h}</Text>
        </View>
      )
    })

    return (
      <View className={className}>
        <View className='title'>
          <Text>历史</Text>
          <Image onClick={this.clearHistory} src={clearIcon} 
                 mode='scaleToFill' className='clear-history'>
          </Image>
        </View>
        <View className='items'>
          {items}
        </View>
      </View>
    )
  }

  renderSuggestions() {
    let className = 'suggestions'

    if (this.state.suggestions.length === 0) {
      className += ' no-suggestions'
    }

    const items = this.state.suggestions.map((v, i) => {
      return (
        <View className='suggestion' key={String(i)} onClick={() => this.query(v.value)}>
          <Text className='value'>{v.value}</Text>
          <Text className='label'>{v.label.replace('\\n', ' ')}</Text>
        </View>
      )
    })

    return (
      <ScrollView className={className} scrollY scrollWithAnimation>
        {items}
      </ScrollView>
    )
  }

  clearHistory() {
    Taro.showModal({
      title: '警告',
      content: '您确定要清空历史记录吗？',
      showCancel: true,
      success: (result) => {
        if (result.confirm) {
          this.history.clear()
          Taro.showToast({
            title: '已清空',
            success: () => {
              setTimeout(() => {
                Taro.reLaunch({url: '/pages/index/index'})
              }, 500)
            }
          })
        }
      }
    })
  }

  render () {
    let loadingView = (
     <Image src={loadingIcon} className={this.state.suggestionsLoading ? 'loading' : 'loading hide'} mode='scaleToFill'></Image>
    )

    return (
      <Layout>
        <View className='index'>
           <View className='header'>
              <View className='input-box'>
                <Image src={searchIcon} className='search' mode='scaleToFill'></Image>
                <Input placeholder='请输入单词或者句子' maxLength={256} 
                       confirmType='search' value={this.props.search.text} 
                       onInput={this.onInput}
                       onConfirm={this.onConfirm}></Input>
                {loadingView}
                <Image src={closeIcon} className='close' mode='scaleToFill' onClick={this.onClearTapped}></Image>
              </View>
              {this.renderSuggestions()}
          </View>
          {this.renderHistory()}
        </View>
      </Layout>
    )
  }
}
