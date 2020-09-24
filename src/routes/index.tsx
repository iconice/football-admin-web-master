import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './route-maping'
import BasicLayout from '@/pages/layout'
import { asyncComponent } from '@/utils/react'

interface IProps {
  dispatch?: IDispatch
}
class Routers extends Component<IProps> {
  render() {
    return (
      <Switch>
        {routes.map((item, index) => {
          const CurrentComponent = asyncComponent(() =>
            import(`@/pages${item.componentPath}`)
          )
          return (
            <Route
              strict
              exact
              key={index}
              path={item.path}
              component={() =>
                item.componentPath === '/login' ? (
                  <CurrentComponent />
                ) : (
                  <BasicLayout menuName='' dispatch={this.props.dispatch}>
                    <CurrentComponent />
                  </BasicLayout>
                )
              }
            />
          )
        })}
      </Switch>
    )
  }
}
export default Routers
