import { EffectsCommandMap } from 'dva-core'
import { message as Message } from 'antd'
import { rightCode } from '@/utils/request/errorHandle'
import {
  queryTaskList,
  createTask,
  editTask,
  deleteTask,
  checkCronExpression,
  onceRun,
  changeStatus
} from '@/services/system-monitor'

const namespace = 'timing-task'
export { namespace }
export default {
  namespace,
  state: {
    tableData: [],
    total: 0,
    size: 10,
    page: 0,
    visible: false,
    title: '新增任务',
    editId: '', // 当前操作数据项的id
    editData: {}, // 当前操作数据项
    cronOk: true // 执行表达式校验是否正确
  },
  effects: {
    // 任务分页查询
    *queryTaskList(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(queryTaskList, { ...payload })
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
    // 创建任务
    *createTask(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(createTask, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'queryTaskList',
            payload: {
              pageSize: 10,
              offset: 0
            }
          })
        }
      } catch (e) {}
    },
    // 编辑任务
    *editTask({ payload }: { payload: any }, { call, put }: EffectsCommandMap) {
      try {
        const { code, message } = yield call(editTask, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'setState',
            payload: {
              visible: false
            }
          })
          yield put({
            type: 'queryTaskList',
            payload: {
              pageSize: 10,
              offset: 0
            }
          })
        }
      } catch (e) {}
    },
    // 删除任务
    *deleteTask(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, message } = yield call(deleteTask, { ...payload })
        if (code === rightCode) {
          Message.success(message)
          yield put({
            type: 'queryTaskList',
            payload: {
              pageSize: 10,
              offset: 0
            }
          })
        }
      } catch (e) {}
    },
    // 校验cron表达式是否有效
    *checkCronExpression(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code } = yield call(checkCronExpression, { ...payload })
        yield put({
          type: 'setState',
          payload: {
            cronOk: code === rightCode ? true : false
          }
        })
      } catch (e) {}
    },
    // 立即执行一次
    *onceRun({ payload }: { payload: any }, { call, put }: EffectsCommandMap) {
      try {
        const { code, message } = yield call(onceRun, { ...payload })
        if (code === rightCode) {
          Message.success(message)
        }
      } catch (e) {}
    },
    // 状态切换
    *changeStatus({ payload }: { payload: any }, { call }: EffectsCommandMap) {
      try {
        const { code, message } = yield call(changeStatus, { ...payload })
        if (code === rightCode) {
          Message.success(message)
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
