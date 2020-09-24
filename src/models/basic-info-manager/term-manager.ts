import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  queryTermList,
  createTerm,
  editTerm
} from '@/services/basic-info-manager'

const namespace = 'term-manager'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [],
    size: 10,
    page: 0,
    visible: false,
    title: '新增学年',
    total: 0,
    editData: {} // 当前编辑数据项
  },
  effects: {
    // 列表查询
    *queryTermList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(queryTermList, { ...payload })
        if (code !== rightCode) return
        yield put({
          type: 'setState',
          payload: {
            tableData: data.list,
            total: data.total
          }
        })
      } catch (e) {}
    },
    // 新增学年
    *createTerm(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createTerm, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          const { size, page } = yield select((state: any) => state[namespace])
          yield put({
            type: 'queryTermList',
            payload: {
              pageSize: size,
              offset: page * size
            }
          })
        }
      } catch (e) {}
    },
    // 编辑学年
    *editTerm(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(editTerm, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          const { size, page } = yield select((state: any) => state[namespace])
          yield put({
            type: 'queryTermList',
            payload: {
              pageSize: size,
              offset: page * size
            }
          })
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
