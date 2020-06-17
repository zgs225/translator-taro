import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'
import Timer from '../../utils/timer'
import Layout from '../../layouts/layout'

import './index.scss'

import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';
import { inject, observer } from '@tarojs/mobx'

@inject('searchStore')
@observer
export default class Index extends Component<any> {
  protected timer: Timer

  constructor() {
    super(arguments)
    this.timer = Timer.delay(300)
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () {
    this.timer.clear()
  }

  componentDidShow () { }

  componentDidHide () { }

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
  }

  onClearTapped() {
    const { searchStore } = this.props
    searchStore.reset()
  }

  render () {
    console.log(this.props)
    const { searchStore: { text }} = this.props
    return (
      <Layout>
        <View className='index'>
           <View className='header'>
              <View className='input-box'>
                <Image src={searchIcon} className='search' mode='scaleToFill'></Image>
                <Input placeholder='请输入单词或者句子' maxLength={256} confirmType='search' value={text} onInput={this.onInput}></Input>
                <Image src={closeIcon} className='close' mode='scaleToFill' onClick={this.onClearTapped}></Image>
              </View>
          </View>
        </View>
      </Layout>
    )
  }
}
