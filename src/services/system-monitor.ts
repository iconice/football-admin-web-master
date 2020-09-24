import request from '@/utils/request'

/**
 * 定时任务
 */

// 定时任务分页查询
const queryTaskList = (param: object) =>
  request(`/job/pageJobList`, {
    method: 'post',
    body: param
  })

// 创建定时任务
const createTask = (param: object) =>
  request(`/job/createJob`, {
    method: 'post',
    body: param
  })

// 编辑定时任务
const editTask = (param: object) =>
  request(`/job/jobEditeSubmit`, {
    method: 'post',
    body: param
  })

// 删除定时任务
const deleteTask = (param: { id: string }) =>
  request(`/job/deleteJob/${param.id}`)

// 校验cron表达式是否有效
const checkCronExpression = (param: { cron: string }) =>
  request(`/job/checkCronExpressionIsValid?cronExpression=${param.cron}`)

// 立即执行一次
const onceRun = (param: { id: string }) => request(`/job/oneRun/${param.id}`)

// 状态切换
const changeStatus = (param: { id: string; status: string }) =>
  request(`/job/switchStatus/${param.id}/${param.status}`)

export {
  queryTaskList,
  createTask,
  editTask,
  deleteTask,
  checkCronExpression,
  onceRun,
  changeStatus
}
