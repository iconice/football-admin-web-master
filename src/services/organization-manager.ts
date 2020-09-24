import request from '@/utils/request'

// 创建机构
const createOrg = (param: object) =>
  request(`/ucenter/org/createOrg`, {
    method: 'post',
    body: param
  })

// 删除机构
const delOrg = (param: { id: string }) =>
  request(`/ucenter/org/deleteOrgById/${param.id}`)

// 机构分页查询
const queryOrgList = (param: object) =>
  request(`/ucenter/org/pageOrgList`, {
    method: 'post',
    body: param
  })

export { createOrg, delOrg, queryOrgList }
