import { EffectsCommandMap } from 'dva-core'
import { queryUserList } from '@/services/system-manager'

const namespace = 'home'
export { namespace }
export default {
  namespace,
  state: {
    testState: 0,
    count: 0
  },
  effects: {
    *test(_: any, { call, put }: EffectsCommandMap) {
      try {
        const rules = yield call(queryUserList)
        yield put({
          type: 'setState',
          payload: {
            testState: rules
          }
        })
      } catch (e) {}
    },
    *count(_: any, { put, select }: EffectsCommandMap) {
      try {
        const count = yield select((state: any) => state[namespace].count)
        yield put({
          type: 'setState',
          payload: {
            count: count + 1
          }
        })
      } catch (e) {}
    }
  },
  reducers: {
    setState(state: any, { payload }: { payload: any }) {
      return { ...state, ...payload }
    }
  }
}
