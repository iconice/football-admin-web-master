import { EffectsCommandMap } from 'dva-core'
import { queryApplyList } from '@/services/entrance-manager'
import { rightCode } from '@/utils/request/errorHandle'

const namespace = 'entrance-review'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [],
    total: 0,
    size: 10,
    page: 1,
    editId: '', // 当前操作数据项的id
    editData: {} // 当前操作数据项
  },
  effects: {
    // 用户分页查询
    *queryApplyList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(queryApplyList, { ...payload })
        if (code !== rightCode) return
        yield put({
          type: 'setState',
          payload: {
            tableData: data.list,
            total: data.total
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
