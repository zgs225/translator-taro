import { View, Image, Text } from '@tarojs/components'

import './layout.scss'
import CatIcon from '../assets/icons/cat_walk.svg'
import LoadingIcon from '../assets/icons/loading.svg'
import BackIcon from '../assets/icons/back.svg'
import MyComponent from '../utils/component'


export default class Layout extends MyComponent {
  constructor(props) {
    super(props)
    this.state = {
      statusBarHeight: 0,
    }
  }

  componentWillMount() {
    Taro.getSystemInfo().then((result) => {
      this.setState({
        statusBarHeight: result.statusBarHeight
      })
    })
  }

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

  renderNavigationBarImg() {

    const { navigateBack } = this.props

    if (navigateBack) {
      return <Image src={BackIcon} mode="heightFix" className="back" onClick={() => Taro.navigateBack()}></Image>
    }
    return <Image src={CatIcon} mode="heightFix" className="logo"></Image>
  }

  render() {
    const navbarStyle = {
      'padding': `${this.state.statusBarHeight+10}px 1rem 0 1rem`,
    }

    return (
      <View className="app">
        {this.renderLoading()}

        <View className="navbar" style={navbarStyle}>
          <View className="left">
            {this.renderNavigationBarImg()}
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