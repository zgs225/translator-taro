import { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './layout.scss'
import CatIcon from '../assets/icons/cat_walk.svg'


export default class Layout extends Component {
  componentDidMount() {
    console.log(this)
  }

  render() {
    return (
      <View className="app">
        <View className="navbar">
          <View className="left">
            <Image src={CatIcon} mode="heightFix" className="logo"></Image>
            <Text className="brand">小猫多国语言词典</Text>
          </View>
        </View>

        <View className="app-body">
          {this.props.children}
        </View>
      </View>
    )
  }
}