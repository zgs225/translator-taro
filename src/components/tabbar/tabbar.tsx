import MyComponent from '../../utils/component'
import { Route } from '../../models/route';
import { View, Image, Text } from '@tarojs/components';

import './tabbar.scss'

export default class TabBar extends MyComponent<{routes: Array<Route>}, any> {
  constructor(props: {routes: Array<Route>}) {
    super(props)
  }

  renderRuotes() {
    const routes = this.props.routes
    return routes.map((route: Route) => {
      return (
        <View className='item' key={route.path}>
          <Image src={route.icon} className='icon' mode='scaleToFill'></Image>
          <Text className='label'>{route.label}</Text>
        </View>
      )
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