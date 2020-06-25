import { View, Image, Text } from '@tarojs/components'

import './layout.scss'
import CatIcon from '../assets/icons/cat_walk.svg'
import LoadingIcon from '../assets/icons/loading.svg'
import MyComponent from '../utils/component'


export default class Layout extends MyComponent {
  renderLoading() {
    const { page: { loading }} = this.props

    if (loading) {
      return (
        <View className='loading-container'>
          <Image src={LoadingIcon} className='loading'></Image>
        </View>
      )
    }
  }

  render() {
    return (
      <View className="app">
        {this.renderLoading()}

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