import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  queryClassList,
  createClass,
  deleteClass
} from '@/services/basic-info-manager'

const namespace = 'class-manager'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [],
    size: 10,
    page: 0,
    visible: false,
    title: '新增年级',
    total: 0,
    editData: {} // 当前编辑数据项
  },
  effects: {
    // 列表查询
    *queryClassList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(queryClassList, { ...payload })
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
    // 新增班级
    *createClass(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createClass, { ...payload })
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
            type: 'queryClassList',
            payload: {
              pageSize: size,
              offset: page * size
            }
          })
        }
      } catch (e) {}
    },
    // 删除班级
    *deleteClass(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(deleteClass, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          const { size, page } = yield select((state: any) => state[namespace])
          yield put({
            type: 'queryClassList',
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
