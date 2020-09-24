import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  queryOrgList,
  createOrg,
  delOrg
} from '@/services/organization-manager'

const namespace = 'organization-info'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [],
    total: 0,
    visible: false,
    title: '新增机构',
    editData: {},
    page: 0,
    size: 10
  },
  effects: {
    *queryOrgList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(queryOrgList, { ...payload })
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
    *createOrg(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createOrg, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'queryOrgList',
            payload: {
              offset: 0,
              pageSize: 10
            }
          })
        }
      } catch (e) {}
    },
    *delOrg({ payload }: { payload: any }, { call, put }: EffectsCommandMap) {
      try {
        const { code, message } = yield call(delOrg, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'queryOrgList',
            payload: {
              offset: 0,
              pageSize: 10
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
