import { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions/page'

@connect((state: any) => {
  return { page: state.page.toJS() }
}, (dispatch: any) => {
  return {
    ...bindActionCreators(Actions, dispatch)
  }
})
export default class MyComponent<P> extends Component<P> {
  readonly props: Readonly<P> & Readonly<{setLoading?: any}>

  $setLoading(loading: boolean) {
    const { setLoading } = this.props
    setLoading(loading)
  }
}