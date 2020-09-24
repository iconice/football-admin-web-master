import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { hot } from 'react-hot-loader/root'
import './App.scss'
import Routers from './routes'
import dva from '@/utils/dva/index'
import models from '@/models'
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter
} from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()
export const routerReducer = connectRouter(history)
export const routerMiddlewareForDispatch = routerMiddleware(history)

export const app = dva({
  models,
  initialState: {},
  extraReducers: { router: routerReducer },
  onAction: [routerMiddlewareForDispatch]
})

const f: React.FC = app.start(
  // @ts-ignore
  <ConnectedRouter history={history}>
    <ConfigProvider locale={zhCN}>
      <Routers />
    </ConfigProvider>
  </ConnectedRouter>
)

export default process.env.NODE_ENV === 'development' ? hot(f) : f
