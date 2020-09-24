// layout公共数据
import { EffectsCommandMap } from 'dva-core'
import { getAllOrgList, getAllGradeList } from '@/services/common'
import { rightCode } from '@/utils/request/errorHandle'

const namespace = 'common'
export { namespace }
export default {
  namespace,
  state: {
    orgList: [], // 所有机构
    gradeList: [] // 所有年级
  },
  effects: {
    // 获取所有机构
    *getAllOrgList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { data, code } = yield call(getAllOrgList)
        if (code !== rightCode) return
        yield put({
          type: 'setState',
          payload: {
            orgList: data
          }
        })
      } catch (e) {}
    },
    // 获取当前登录用户机构下的所有年级
    *getAllGradeList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(getAllGradeList)
        if (code !== rightCode) return
        yield put({
          type: 'setState',
          payload: {
            gradeList: data
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
