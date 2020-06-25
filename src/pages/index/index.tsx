import Taro, { Config } from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import Timer from '../../utils/timer'
import Layout from '../../layouts/layout'
import { bindActionCreators } from 'redux'
import { connect } from '@tarojs/redux'
import MyComponent from '../../utils/component'

import './index.scss'

import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';

import * as Actions from '../../actions/search'

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
export default class Index extends MyComponent<any> {
  protected timer: Timer = Timer.delay(300)

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
    navigationBarTitleText: '多国翻译词典',
    usingComponents: {
      'Layout': '../../layouts/layout'
    }
  }

  onInput(e: any) {
    const { setText } = this.props
    setText(e.detail.value)
  }

  onConfirm(e: any) {
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
    setTimeout(reset, 60)
  }

  render () {
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
                <Image src={closeIcon} className='close' mode='scaleToFill' onClick={this.onClearTapped}></Image>
              </View>
          </View>
        </View>
      </Layout>
    )
  }
}
