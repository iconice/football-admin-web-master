import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  queryGradeList,
  createGrade,
  editGrade,
  deleteGrade
} from '@/services/basic-info-manager'

const namespace = 'grade-manager'
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
    *queryGradeList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(queryGradeList, { ...payload })
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
    // 新增年级
    *createGrade(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createGrade, { ...payload })
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
            type: 'queryGradeList',
            payload: {
              pageSize: size,
              offset: page * size
            }
          })
        }
      } catch (e) {}
    },
    // 编辑年级
    *editGrade(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(editGrade, { ...payload })
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
            type: 'queryGradeList',
            payload: {
              pageSize: size,
              offset: page * size
            }
          })
        }
      } catch (e) {}
    },
    // 删除年级
    *deleteGrade(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(deleteGrade, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          const { size, page } = yield select((state: any) => state[namespace])
          yield put({
            type: 'queryGradeList',
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
