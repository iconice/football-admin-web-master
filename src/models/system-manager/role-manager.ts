import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  queryRoleList,
  createRole,
  editRole,
  deleteRole,
  getPermissionForRole,
  submitPermissionForRole
} from '@/services/system-manager'
import { cycleArr } from '@/utils/tools'

const namespace = 'role-manager'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [],
    size: 10,
    page: 0,
    visible: false,
    visible2: false,
    title: '新增角色',
    total: 0,
    editData: {},
    roleId: '', // 当前编辑角色的id
    permissionData: [], // 用户权限列表
    checkedPermissions: [] // 用户已经用的权限
  },
  effects: {
    // 列表查询
    *queryRoleList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(queryRoleList, { ...payload })
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
    // 新增角色
    *createRole(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createRole, { ...payload })
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
            type: 'queryRoleList',
            payload: {
              pageSize: size,
              offset: page * size
            }
          })
        }
      } catch (e) {}
    },
    // 编辑角色
    *editRole(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(editRole, { ...payload })
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
            type: 'queryRoleList',
            payload: {
              pageSize: size,
              offset: page * size
            }
          })
        }
      } catch (e) {}
    },
    // 删除角色
    *deleteRole(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(deleteRole, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          const { size, page } = yield select((state: any) => state[namespace])
          yield put({
            type: 'queryRoleList',
            payload: {
              pageSize: size,
              offset: page * size
            }
          })
        }
      } catch (e) {}
    },
    // 获取角色权限列表
    *getPermissionForRole(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { data, code } = yield call(getPermissionForRole, {
          ...payload
        })
        if (code !== rightCode) return
        const baseArr = data.filter((it: any) => it.parentId === '0')
        const restrr = data.filter((it: any) => it.parentId !== '0')
        cycleArr(baseArr, restrr)
        const checkedArr = data.filter((it: any) => it.checked)
        const checkedPermissions = checkedArr.map((it: any) => it.id)
        yield put({
          type: 'setState',
          payload: {
            checkedPermissions,
            permissionData: baseArr
          }
        })
      } catch (e) {}
    },
    // 提交分配的权限
    *submitPermissionForRole(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(submitPermissionForRole, {
          ...payload
        })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible2: false
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
