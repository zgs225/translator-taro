import Taro, { Component, Config, closeSocket } from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'
import './index.scss'

import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

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
    navigationBarTitleText: '多国翻译词典'
  }

  render () {
    return (
      <View className='index'>
         <View className='header'>
            <Text className='legend'>
              Dictionary
            </Text>
            <View className='input-box'>
              <Image src={searchIcon} className='search' mode='scaleToFill'></Image>
              <Input placeholder='请输入单词' maxLength={256}></Input>
              <Image src={closeIcon} className='close' mode='scaleToFill'></Image>
            </View>
        </View>
      </View>
    )
  }
}
