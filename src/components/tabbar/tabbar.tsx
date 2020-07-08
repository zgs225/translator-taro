import MyComponent from '../../utils/component'
import { Route } from '../../models/route';
import { View, Image, Text } from '@tarojs/components';

import './tabbar.scss'

export default class TabBar extends MyComponent<{routes: Array<Route>}, any> {
  constructor(props: {routes: Array<Route>}) {
    super(props)

    this.state = {
      curRoute: null,
    }
  }

  componentDidShow() {
    const pages = Taro.getCurrentPages()
    const page = pages[pages.length - 1]
    this.setState({
      curRoute: { path: page.route },
    })
  }

  renderRuotes() {
    const routes = this.props.routes || []
    const curRoute = this.state.curRoute
  
    return routes.map((route: Route) => {
      let className = 'item'
      const actived = curRoute && curRoute.path === route.path
      if (actived) {
        className += ' actived'
      }

      return (
        <View className={className} key={route.path} onClick={() => this.routeTo(route)}>
          <Image src={actived ? route.activedIcon : route.icon} className='icon' mode='scaleToFill'></Image>
          <Text className='label'>{route.label}</Text>
        </View>
      )
    })
  }

  routeTo(route: Route) {
    Taro.navigateTo({
      url: '/' + route.path
    })
  }

  render() {
    return (
      <View className='tabbar'>
        {this.renderRuotes()}
      </View>
    )
  }
}