import request from '@/utils/request'

/**
 *  地址管理
 */

// 地址查询
const queryAddressList = () => request(`/entrance/region/getRegionAddList`)

// 创建地址
const createAddress = (param: object) =>
  request(`/entrance/region/createRegionAdd`, {
    method: 'post',
    body: param
  })

// 编辑地址
const editAddress = (param: object) =>
  request(`/entrance/region/updateRegionAdd`, {
    method: 'post',
    body: param
  })

// 删除地址
const delAddress = (param: { id: string }) =>
  request(`/entrance/region/deleteRegionAdd/${param.id}`)

// 入学审核分页查询
const queryApplyList = (param: object) =>
  request(`/entrance/entranceAuditLog/getAppList`, {
    method: 'post',
    body: param
  })

// 获取家长信息
const getParentInfo = (param: { id: string }) =>
  request(
    `/entrance/parentInformation/getParentInformation?userId=${param.id}`,
    {
      method: 'post'
    }
  )

// 获取儿童户籍信息
const getEntranceBaseInfo = (param: { id: string }) =>
  request(
    `/entrance/entranceApplication/getEntranceBaseInfo?appliId=${param.id}`,
    {
      method: 'post',
      body: param
    }
  )

// 获取房产信息
const getEntranceHouseInfo = (param: { id: string }) =>
  request(`/entrance/entranceHouse/getEntranceHouseInfo?appliId=${param.id}`, {
    method: 'post'
  })

// 获取接种查验数据
const getPreventionInfo = (param: { id: string }) =>
  request(
    `/entrance/entrancePrevention/getEntrancePreventionInfo/${param.id}`,
    {
      method: 'post'
    }
  )

// 获取转学数据
const getTransInfo = (param: { id: string }) =>
  request(`/entrance/entranceStudent/queryApply?studentId=${param.id}`, {
    method: 'post'
  })

// 审核
const checkInfo = (param: object) =>
  request(`/entrance/entranceAuditLog/auditApp`, {
    method: 'post',
    body: param
  })

export {
  queryAddressList,
  createAddress,
  editAddress,
  delAddress,
  queryApplyList,
  getParentInfo,
  getEntranceBaseInfo,
  getEntranceHouseInfo,
  getPreventionInfo,
  getTransInfo,
  checkInfo
}
