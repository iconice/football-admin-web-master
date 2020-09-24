import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  queryAddList,
  createAdd,
  editAdd,
  deleteAdd
} from '@/services/basic-info-manager'
import { cycleArr } from '@/utils/tools'

const namespace = 'school-district-address'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [],
    visible: false,
    title: '新增小区',
    editData: {},
    isEdit: true,
    type: 1 // 编辑类型： 1为小区 2为地址
  },
  effects: {
    // eslint-disable-next-line
    *queryAddList({}, { call, put }: EffectsCommandMap) {
      try {
        const { code, data } = yield call(queryAddList)
        if (code !== rightCode) return
        const baseArr = data.filter((it: any) => it.parentId === '0')
        const restrr = data.filter((it: any) => it.parentId !== '0')
        cycleArr(baseArr, restrr)
        yield put({
          type: 'setState',
          payload: {
            tableData: baseArr
          }
        })
      } catch (e) {}
    },
    *createAdd(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createAdd, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'queryAddList'
          })
        }
      } catch (e) {}
    },
    *deleteAdd(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(deleteAdd, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'queryAddList'
          })
        }
      } catch (e) {}
    },
    *editAdd({ payload }: { payload: any }, { call, put }: EffectsCommandMap) {
      try {
        const { code, message } = yield call(editAdd, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'queryAddList'
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
