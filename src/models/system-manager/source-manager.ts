import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  getPermissionList,
  getCatalogPermissionList,
  createPermission,
  deletePermission,
  editPermission
} from '@/services/system-manager'
import { cycleArr } from '@/utils/tools'

const namespace = 'source-manager'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [],
    siderData: [], // 树形菜单
    visible: false,
    title: '新增',
    editData: {}
  },
  effects: {
    // eslint-disable-next-line
    *getPermissionList({}, { call, put }: EffectsCommandMap) {
      try {
        const { code, data } = yield call(getPermissionList)
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
    // eslint-disable-next-line
    *getCatalogPermissionList({}, { call, put }: EffectsCommandMap) {
      try {
        const { code, data } = yield call(getCatalogPermissionList)
        if (code !== rightCode) return
        const baseArr = data.filter((it: any) => it.parentId === '0')
        const restrr = data.filter((it: any) => it.parentId !== '0')
        cycleArr(baseArr, restrr)
        const rootData = [
          {
            id: '0',
            name: '顶层菜单',
            parentId: '',
            type: 1,
            children: baseArr
          }
        ]
        yield put({
          type: 'setState',
          payload: {
            siderData: rootData
          }
        })
      } catch (e) {}
    },
    *createPermission(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createPermission, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'getPermissionList'
          })
        }
      } catch (e) {}
    },
    *deletePermission(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(deletePermission, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'getPermissionList'
          })
        }
      } catch (e) {}
    },
    *editPermission(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(editPermission, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'getPermissionList'
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
