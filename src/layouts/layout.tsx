import { View, Image, Text } from '@tarojs/components'

import './layout.scss'
import CatIcon from '../assets/icons/cat_walk.svg'
import LoadingIcon from '../assets/icons/loading.svg'
import BackIcon from '../assets/icons/back.svg'
import DictIcon from '../assets/icons/dict.svg'
import ActivedDictIcon from '../assets/icons/actived_dict.svg'
import TranslateIcon from '../assets/icons/Translate.svg'
import ActivedTranslateIcon from '../assets/icons/actived_translate.svg'
import PawIcon from '../assets/icons/paw.svg'
import ActivedPawIcon from '../assets/icons/actived_paw.svg'
import MyComponent from '../utils/component'
import { Route } from '../models/route'
import TabBar from '../components/tabbar/tabbar'
import { Config } from '@tarojs/taro'


export default class Layout extends MyComponent<any, any> {
  protected readonly routes: Array<Route> = [
    {
      path: 'pages/index/index',
      label: '词典',
      icon: DictIcon,
      activedIcon: ActivedDictIcon
    },
    {
      path: 'pages/translate/index',
      label: '翻译',
      icon: TranslateIcon,
      activedIcon: ActivedTranslateIcon,
    },
    {
      path: 'pages/user/index',
      label: '我的',
      icon: PawIcon,
      activedIcon: ActivedPawIcon
    }
  ]

  config: Config = {
    usingComponents: {
      'TabBar': '../components/tabbar/tabbar'
    }
  }

  constructor(props: any) {
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

        <View className='app-footer'>
          <TabBar routes={this.routes}></TabBar>
        </View>
      </View>
    )
  }
}