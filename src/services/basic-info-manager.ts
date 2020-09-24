import request from '@/utils/request'
import { getLocalStorage } from '@/utils/storage'

const userData = JSON.parse(getLocalStorage('userData') || '{}')

/**
 *  年级管理
 */

// 年级分页查询
const queryGradeList = (param: object) =>
  request(`/school/grade/pageGradeList`, {
    method: 'post',
    body: param
  })

// 创建年级
const createGrade = (param: object) =>
  request(`/school/grade/createGrade`, {
    method: 'post',
    body: param
  })

// 编辑年级
const editGrade = (param: object) =>
  request(`/school/grade/updateGrade`, {
    method: 'post',
    body: param
  })

// 删除年级
const deleteGrade = (param: { id: string }) =>
  request(`/school/grade/deleteGrade/${param.id}`)

/**
 * 班级管理
 */

// 班级分页查询
const queryClassList = (param: object) =>
  request(`/school/class/pageClassList`, {
    method: 'post',
    body: param
  })

// 创建班级
const createClass = (param: object) =>
  request(`/school/class/createClass`, {
    method: 'post',
    body: param
  })

// 删除班级
const deleteClass = (param: { id: string }) =>
  request(`/school/class/deleteClass/${param.id}`)

/**
 * 学年管理
 */

// 学年分页查询
const queryTermList = (param: object) =>
  request(`/school/term/pageTermList`, {
    method: 'post',
    body: param
  })

// 创建学年
const createTerm = (param: object) =>
  request(`/school/term/createTerm`, {
    method: 'post',
    body: param
  })

// 编辑学年
const editTerm = (param: { id: string }) =>
  request(`/school/term/getTermInfo/${param.id}`, {
    method: 'post',
    body: param
  })

/**
 * 学区地址管理
 */

// 获取学区/地址列表
const queryAddList = () =>
  request(`/school/region/getRegionAddList/${userData.orgId}`)

// 新增学区/地址
const createAdd = (param: object) =>
  request(`/school/region/createRegionAdd`, {
    method: 'post',
    body: param
  })

// 编辑学区/地址
const editAdd = (param: object) =>
  request(`/school/region/updateRegionAdd`, {
    method: 'post',
    body: param
  })

// 删除学区/地址
const deleteAdd = (param: { id: string }) =>
  request(`/school/region/deleteRegionAdd/${param.id}`)

export {
  queryGradeList,
  createGrade,
  editGrade,
  deleteGrade,
  queryClassList,
  createClass,
  deleteClass,
  queryTermList,
  createTerm,
  editTerm,
  queryAddList,
  createAdd,
  editAdd,
  deleteAdd
}
