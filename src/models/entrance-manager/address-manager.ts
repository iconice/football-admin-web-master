import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  queryAddressList,
  createAddress,
  editAddress,
  delAddress
} from '@/services/entrance-manager'
import { cycleArr } from '@/utils/tools'

const namespace = 'address-manager'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [], // 表格数据
    regionArr: [], // 小区数组
    // size: 10,
    // page: 0,
    visible: false, // 编辑/新增模态框是否显示
    title: '新增角色', // 模态框标题
    total: 0, // 总页数
    editData: {}, // 编辑时模态框初始数据
    roleId: '' // 当前编辑地址的id
  },
  effects: {
    // 列表查询
    *queryList(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(queryAddressList)
        if (code !== rightCode) return
        const baseArr = data.filter((it: any) => it.parentId === '0')
        const restrr = data.filter((it: any) => it.parentId !== '0')
        cycleArr(baseArr, restrr)
        const state = yield select((state: any) => state[namespace])
        yield put({
          type: 'setState',
          payload: {
            tableData: baseArr,
            regionArr: data.filter((it: any) => it.parentId === '0'),
            total: baseArr.length / state.size
          }
        })
      } catch (e) {}
    },
    // 新增地址
    *createAddress(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createAddress, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'queryList'
          })
        }
      } catch (e) {}
    },
    // 编辑地址
    *editAddress(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(editAddress, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'queryList'
          })
        }
      } catch (e) {}
    },
    // 删除地址
    *delAddress(
      { payload }: { payload: any },
      { call, put, select }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(delAddress, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          const { size, page } = yield select((state: any) => state[namespace])
          yield put({
            type: 'queryList',
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
