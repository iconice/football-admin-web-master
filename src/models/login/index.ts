import { EffectsCommandMap } from 'dva-core'
import { rightCode } from '@/utils/request/errorHandle'
import { login, getJwt, loginOut } from '@/services/login'
import {
  setLocalStorage,
  clearLocalStorage,
  getLocalStorage
} from '@/utils/storage'
import history from '@/utils/history'
import * as jwt from 'jsonwebtoken'
import systemConfig from '@/config'

const namespace = 'login'
export { namespace }
export default {
  namespace,
  state: {},
  effects: {
    *login({ payload }: { payload: any }, { call, put }: EffectsCommandMap) {
      try {
        const { code, data } = yield call(login, { ...payload })
        if (code === rightCode) {
          // 登录成功
          // 获取登陆令牌
          yield put({
            type: 'getJwt'
          })
          setLocalStorage('uid', data.token)
        }
      } catch (e) {}
    },
    *getJwt({ payload }: { payload: any }, { call }: EffectsCommandMap) {
      try {
        const { code, data } = yield call(getJwt)
        if (code !== rightCode) return
        setLocalStorage(systemConfig.authKey, data.jwp)
        const userData = jwt.decode(data.jwp)
        setLocalStorage('userData', userData ? JSON.stringify(userData) : '{}')
        const currentUrl = getLocalStorage('currentUrl')
        history.replace(currentUrl || '/system_manager/user_manager')
        window.location.reload()
      } catch (e) {}
    },
    *loginOut({ payload }: { payload: any }, { call }: EffectsCommandMap) {
      try {
        const { code } = yield call(loginOut)
        if (code !== rightCode) return
        // 退出登录成功
        history.replace('/login')
        clearLocalStorage()
      } catch (e) {}
    }
  },
  reducers: {
    setState(state: any, { payload }: { payload: any }) {
      return { ...state, ...payload }
    }
  }
}
