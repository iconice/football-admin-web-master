import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  queryUserList,
  queryRoleList,
  getUserRole,
  submitRole,
  createUser,
  editUser,
  deleteUser
} from '@/services/system-manager'

const namespace = 'user-manager'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [],
    total: 0,
    size: 10,
    page: 0,
    visible: false,
    visible2: false,
    title: '新增用户',
    orgList: [], // 所有机构数据
    roleList: [],
    editId: '', // 当前操作数据项的id
    editData: {}, // 当前操作数据项
    roleArr: [] // 当前操作数据项已经分配的角色
  },
  effects: {
    // 用户分页查询
    *queryUserList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(queryUserList, { ...payload })
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
    // 获取所有角色
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
            roleList: data.list
          }
        })
      } catch (e) {}
    },
    // 获取当前用户已分配角色
    *getUserRole(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(getUserRole, { ...payload })
        if (code !== rightCode) return
        const roleArr = data.map((it: any) => {
          if (it.checked) return it.id
          return ''
        })
        yield put({
          type: 'setState',
          payload: {
            roleArr: roleArr.filter(
              (it: any) => typeof it === 'string' && it.length
            )
          }
        })
      } catch (e) {}
    },
    // 确认分配角色
    *submitRole(
      { payload, callback }: { payload: any; callback: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(submitRole, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible2: false
            }
          })
          callback()
        }
      } catch (e) {}
    },
    // 创建用户
    *createUser(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createUser, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'queryUserList',
            payload: {
              pageSize: 10,
              offset: 0
            }
          })
        }
      } catch (e) {}
    },
    // 编辑用户
    *editUser({ payload }: { payload: any }, { call, put }: EffectsCommandMap) {
      try {
        const { code, message } = yield call(editUser, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'queryUserList',
            payload: {
              pageSize: 10,
              offset: 0
            }
          })
        }
      } catch (e) {}
    },
    // 删除用户
    *deleteUser(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(deleteUser, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'queryUserList',
            payload: {
              pageSize: 10,
              offset: 0
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
