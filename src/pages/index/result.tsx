import { Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Layout from '../../layouts/layout'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../../actions/result'
import { SpeakStatus } from '../../constants/result'
import './result.scss'
import toErrorMessage from '../../utils/youdao_error'
import BellIcon from '../../assets/icons/cat_bell_collar.svg'
import MyComponent from '../../utils/component'

@connect((state: any) => {
  return {
    result: state.result.toJS(),
  }
}, (dispatch: any) => {
  return {
    ...bindActionCreators(Actions, dispatch)
  }
})
export default class Result extends MyComponent<any, any> {
  protected audio?: Taro.InnerAudioContext

  config: Config = {
    usingComponents: {
      'Layout': '../../layouts/layout'
    }
  }

  constructor(props: any) {
    super(props)
    this.state = {
      speak_status: SpeakStatus.NORMAL,
    }
  }

  componentDidMount() {
    const eventChannel = this.$scope.getOpenerEventChannel()
    eventChannel.on('acceptData', (data: any) => {
      if (data) {
        const { setYoudaoResult } = this.props
        setYoudaoResult(data)
      }
    })
  }

  speak() {
    if (this.audio) {
      this.audio.play()
      return
    }
    const { result } = this.props
    const text = result.query
    const lang = result.l.split('2')[0]

    this.setState({speak_status: SpeakStatus.PREPARING})
    this.$request({
      url: 'https://translator-api.dongnan.xin/v1/api/tts',
      data: {
        text,
        lang
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      fail: () => {
        this.setState({speak_status: SpeakStatus.NORMAL})
      },
      success: (resp) => {
        const data = resp.data
        if (data && data.code != undefined && data.code == 0) {
          this.setState({speak_status: SpeakStatus.PREPARING})
          const audio = Taro.createInnerAudioContext()
          audio.onWaiting(() => {
            this.setState({speak_status: SpeakStatus.PREPARING})
          })
          audio.onCanplay(() => {
            this.setState({speak_status: SpeakStatus.NORMAL})
          })
          audio.onPlay(() => {
            this.setState({speak_status: SpeakStatus.PLAYING})
          })
          audio.onEnded(() => {
            this.setState({speak_status: SpeakStatus.NORMAL})
          })
          audio.src = data.data.speak_url
          audio.autoplay = true
          this.audio = audio
        }
      }
    }, false)
  }

  renderError() {
    const { result } = this.props

    let className = 'errors'

    if (result.errorCode == '0') {
      className += ' no-errors'
    }

    return (
      <View className={className}>
        {toErrorMessage(result.errorCode)}
      </View>
    )
  }

  renderBasic() {
    const { result } = this.props

    let className = 'basic'

    const explains = (result.basic && result.basic.explains || []).map((explain, i) => {
      return (
        <View className='explain' key={String(i)}>
          <Text>{explain}</Text>
        </View>
      )
    })

    let speakClass = 'speak'

    switch (this.state.speak_status) {
      case SpeakStatus.PLAYING:
        speakClass += ' playing'
        break
      case SpeakStatus.PREPARING:
        speakClass += ' loading'
        break
    }

    return (
      <View className={className}>
        <View className='query'>
          <Text>{result.query}</Text>
        </View>
        <View className={result.basic.phonetic ? 'phonetic' : 'phonetic no-phonetic'}>
          <Text>/{result.basic.phonetic}/</Text>
        </View>
        <View className={speakClass} onClick={this.speak}>
          <Image src={BellIcon} mode='scaleToFill' className='icon'></Image>
          <View className='lds-ellipsis'>
            <View className='dot'></View>
            <View className='dot'></View>
            <View className='dot'></View>
            <View className='dot'></View>
          </View>
        </View>
        <View className='explains'>
          {explains}
        </View>
      </View>
    )
  }

  renderTranslation() {
    const { result } = this.props
    let className = 'translations'
    if (result.basic && result.basic.explains) {
      className += ' no-translations'
    }

    const translations = (result.translation || []).map((t, i) => {
      return (
        <View className='translation' key={String(i)}>
          <Text>{t}</Text>
        </View>
      )
    })

    return (
      <View className={className}>
        <View className='title'>
          翻译
        </View>
        {translations}
      </View>
    )
  }

  renderWeb() {
    const { result } = this.props
    let className = 'web'
    if (!result.web) {
      className += ' no-web'
    }

    const elems = (result.web || []).map((w, i)=> {
      const values = w.value || []
      const itemValues = values.map((v, j) => {
        return (
          <View className='web-item-value' key={String(j)}>
            <Text>{v}</Text>
          </View>
        )
      })
      return (
        <View className='web-item' key={String(i)}>
          <View className='web-item-key'>
            <Text>{w.key}</Text>
          </View>
          {itemValues}
        </View>
      )
    })

    return (
      <View className={className}>
        <View className='title'>
          网络释义
        </View>
        {elems}
      </View>
    )
  }

  render() {
    return (
      <Layout navigateBack={true}>
        <View className='container'>
          {this.renderError()}
          {this.renderBasic()}

          <View className='round-container'>
            {this.renderTranslation()}
            {this.renderWeb()}
          </View>
        </View>
      </Layout>
    )
  }
}