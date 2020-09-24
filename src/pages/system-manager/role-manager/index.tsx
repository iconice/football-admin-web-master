import React, { Component } from 'react'
import { Input, Button, Modal } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { namespace } from '@/models/system-manager/role-manager'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { MyTable, EditRole, EditPermission } from './components'

interface Data {
  [key: string]: any
}
interface IProps {
  tableData: Array<ColumnProps<Data>>
  size: number
  page: number
  visible: boolean
  visible2: boolean
  title: string
  total: number
  editData: { [key: string]: any } // 当前编辑的数据项
  roleId: string
  permissionData: any[]
  checkedPermissions: string[]
  dispatch: IDispatch
}

class RoleManager extends Component<IProps> {
  state = {}

  componentDidMount() {
    this.init()
  }
  init = () => {
    const { size, page } = this.props
    this.search(page, size)
  }
  // 查询
  search = (page: number, size: number) => {
    this.props.dispatch({
      type: `${namespace}/queryRoleList`,
      payload: {
        pageSize: size,
        offset: page * size
      }
    })
  }
  // 分页查询
  pageChange = (page: number, pageSize?: number) => {
    const { size } = this.props
    this.search(page - 1, pageSize || size)
  }

  // 每页展示条数更改
  sizeChange = (current: number, size: number) => {
    this.search(current - 1, size)
  }

  // 关闭模态框
  closeModal = () => {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: false
      }
    })
  }
  // 关闭权限模态框
  closeModal2 = () => {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible2: false
      }
    })
  }

  // 创建角色
  createRole = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/createRole`,
      payload: param
    })
  }

  // 编辑角色
  editRole = () => {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: true,
        title: '编辑角色'
      }
    })
  }

  // 编辑角色提交
  editConfirm = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/editRole`,
      payload: param
    })
  }

  // 删除角色
  deleteRole = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/deleteRole`,
      payload: {
        id
      }
    })
  }

  // 编辑权限
  editPermission = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible2: true,
        roleId: id
      }
    })
    this.props.dispatch({
      type: `${namespace}/getPermissionForRole`,
      payload: {
        id
      }
    })
  }

  // 修改权限勾选数据
  changePermissions = (checkedKeys: string[]) => {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        checkedPermissions: checkedKeys
      }
    })
  }

  // 提交权限修改
  confirmPermission = () => {
    const { checkedPermissions, roleId } = this.props
    this.props.dispatch({
      type: `${namespace}/submitPermissionForRole`,
      payload: {
        roleId,
        permissionIdStr: checkedPermissions.toString()
      }
    })
  }
  render() {
    // const rowSelection = {}
    const {
      tableData,
      visible,
      visible2,
      title,
      total,
      size,
      editData,
      permissionData,
      checkedPermissions
    } = this.props
    return (
      <>
        <div className={styles.serchBox}>
          <div className={styles.serchItem}>
            <label>角色名称：</label>
            <Input className={styles.input} />
          </div>
          <Button type='primary' onClick={this.init}>
            查询
          </Button>
        </div>
        <div className={styles.tabBox}>
          <div className={styles.operateLine}>
            <Button
              type='primary'
              icon='plus'
              className={styles.operateItem}
              onClick={() =>
                this.props.dispatch({
                  type: `${namespace}/setState`,
                  payload: {
                    visible: true,
                    title: '新增角色',
                    editData: {}
                  }
                })
              }
            >
              新增
            </Button>
            <Button
              shape='circle'
              icon='redo'
              className={styles.operateItem}
              onClick={this.init}
            />
          </div>
          <MyTable
            data={tableData}
            total={total}
            size={size}
            // rowSelection={rowSelection}
            edit={(record: any) =>
              this.props.dispatch({
                type: `${namespace}/setState`,
                payload: {
                  visible: true,
                  title: '编辑角色',
                  editData: record
                }
              })
            }
            editPermission={this.editPermission}
            deleteRole={this.deleteRole}
            pageChange={this.pageChange}
            sizeChange={this.sizeChange}
          />
        </div>
        {/* 编辑模态框 */}
        <Modal
          visible={visible}
          footer={null}
          title={title}
          onCancel={this.closeModal}
        >
          <EditRole
            addConfirm={this.createRole}
            editConfirm={this.editConfirm}
            editData={editData}
            isEdit={title === '编辑角色' ? 1 : 0}
          />
        </Modal>
        {/* 权限分配模态框 */}
        <Modal
          visible={visible2}
          title='分配权限'
          onCancel={this.closeModal2}
          onOk={this.confirmPermission}
        >
          <EditPermission
            permissionData={permissionData}
            checkedPermissions={checkedPermissions}
            changePermissions={this.changePermissions}
          />
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(RoleManager)
