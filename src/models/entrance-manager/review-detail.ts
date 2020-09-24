import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  getParentInfo,
  getEntranceBaseInfo,
  getEntranceHouseInfo,
  getPreventionInfo,
  getTransInfo,
  checkInfo
} from '@/services/entrance-manager'
const namespace = 'review-detail'
export { namespace }
export default {
  namespace,
  state: {
    parentsInfo: [],
    baseInfo: {},
    houseInfo: {},
    preventionInfo: {},
    transInfo: {}
  },
  effects: {
    // 获取父母信息
    *getParentInfo(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(getParentInfo, { ...payload })
        if (code !== rightCode) return
        yield put({
          type: 'setState',
          payload: {
            parentsInfo: data
          }
        })
      } catch (e) {}
    },
    *getEntranceBaseInfo(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(getEntranceBaseInfo, { ...payload })
        if (code !== rightCode) return
        yield put({
          type: 'setState',
          payload: {
            baseInfo: data
          }
        })
      } catch (e) {}
    },
    *getEntranceHouseInfo(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(getEntranceHouseInfo, { ...payload })
        if (code !== rightCode) return
        yield put({
          type: 'setState',
          payload: {
            houseInfo: data
          }
        })
      } catch (e) {}
    },
    *getPreventionInfo(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(getPreventionInfo, { ...payload })
        if (code !== rightCode) return
        yield put({
          type: 'setState',
          payload: {
            preventionInfo: data
          }
        })
      } catch (e) {}
    },
    *getTransInfo(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(getTransInfo, { ...payload })
        if (code !== rightCode) return
        yield put({
          type: 'setState',
          payload: {
            transInfo: data
          }
        })
      } catch (e) {}
    },
    *checkInfo(
      { payload, callback }: { payload: any; callback: any },
      { call }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(checkInfo, { ...payload })
        if (code === rightCode) {
          Message.success('提交成功～')
          callback()
        } else {
          Message.error(message)
        }
      } catch (e) {}
    }
  },
  reducers: {
    setState(state: any, { payload }: { payload: any }) {
      return { ...state, ...payload }
    }
  }
}
