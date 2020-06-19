import { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Layout from '../../layouts/layout'

export default class Result extends Component<any> {
  config: Config = {
    usingComponents: {
      'Layout': '../../layouts/layout'
    }
  }

  componentDidMount() {
    const eventChannel = this.$scope.getOpenerEventChannel()
    eventChannel.on('acceptData', (data: any) => console.log(data))
  }

  render() {
    return (
      <Layout>
       <View>Hello world</View>
      </Layout>
    )
  }
}