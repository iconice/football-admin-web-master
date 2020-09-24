import request from '@/utils/request'

/**
 *  菜单管理
 */

// 获取用户菜单权限
const getUserPermission = (param: { id: string }) =>
  request(`/ucenter/permission/getPermissionListById/${param.id}`, {
    noLoading: true
  })

// 获取所有菜单
const getPermissionList = () =>
  request(`/ucenter/permission/getPermissionList`, {
    method: 'post'
  })

// 获取所有菜单（不包含按钮）
const getCatalogPermissionList = () =>
  request(`/ucenter/permission/getCatalogPermissionList`, {
    method: 'post'
  })

// 创建菜单
const createPermission = (param: object) =>
  request(`/ucenter/permission/createPermission`, {
    method: 'post',
    body: param
  })

// 删除菜单
const deletePermission = (param: { id: string }) =>
  request(`/ucenter/permission/deletePermission/${param.id}`)

// 编辑菜单
const editPermission = (param: object) =>
  request(`/ucenter/permission/permissionEditSubmit`, {
    method: 'post',
    body: param
  })

/**
 * 角色管理
 */

// 查询角色列表
const queryRoleList = (param: object) =>
  request(`/ucenter/role/pageRoleList`, {
    method: 'post',
    body: param
  })

// 创建角色
const createRole = (param: object) =>
  request(`/ucenter/role/createRole`, {
    method: 'post',
    body: param
  })

// 编辑角色
const editRole = (param: object) =>
  request(`/ucenter/role/editeRoleSubmit`, {
    method: 'post',
    body: param
  })

// 删除角色
const deleteRole = (param: { id: string }) =>
  request(`/ucenter/role/deleteRole/${param.id}`, {
    method: 'post'
  })

// 获取角色权限列表
const getPermissionForRole = (param: { id: string }) =>
  request(`/ucenter/role/assignPermissionForRole/${param.id}`)

// 提交分配的权限
const submitPermissionForRole = (param: object) =>
  request(`/ucenter/role/assignPermissionForRoleSubmit`, {
    method: 'post',
    body: param
  })

// 确认分配角色
const submitRole = (param: object) =>
  request(`/ucenter/role/assignRoleSubmit`, {
    method: 'post',
    body: param
  })

// 获取用户已分配的角色
const getUserRole = (param: { id: string }) =>
  request(`/ucenter/role/assignRoleList/${param.id}`)

/**
 * 用户管理
 */

// 查询用户列表
const queryUserList = (param: object) =>
  request(`/ucenter/user/pageUserList`, {
    method: 'post',
    body: param
  })

// 创建用户
const createUser = (param: object) =>
  request(`/ucenter/user/createUser`, {
    method: 'post',
    body: param
  })

// 编辑用户
const editUser = (param: object) =>
  request(`/ucenter/user/userEditeSubmit`, {
    method: 'post',
    body: param
  })

// 删除用户
const deleteUser = (param: { id: string }) =>
  request(`/ucenter/user/deleteUser/${param.id}`)

export {
  getUserPermission,
  getPermissionList,
  getCatalogPermissionList,
  createPermission,
  deletePermission,
  editPermission,
  queryRoleList,
  createRole,
  editRole,
  deleteRole,
  getPermissionForRole,
  submitPermissionForRole,
  submitRole,
  getUserRole,
  queryUserList,
  createUser,
  editUser,
  deleteUser
}
