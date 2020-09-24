import React, { Component } from 'react'
import { Input, Button, Modal, Select } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { namespace } from '@/models/system-manager/user-manager'
import { namespace as commonspace } from '@/models/common/common'
import { namespace as layoutspace } from '@/models/common/layout'
import { connect } from 'react-redux'
import { getLocalStorage } from '@/utils/storage'
import styles from './style.module.scss'
import { MyTable, EditUser } from './components'

const { Option } = Select
interface Data {
  key: number
  name: string
  age: number
  address: string
}
interface IProps {
  tableData: Array<ColumnProps<Data>>
  total: number
  size: number
  page: number
  visible: boolean
  visible2: boolean
  title: string
  userData: object
  orgList: any[]
  roleList: any[]
  editId: string
  editData: any
  roleArr: any[]
  dispatch: IDispatch
}
interface IState {
  roleId: string[]
}

class UserManager extends Component<IProps, IState> {
  state = {
    roleId: []
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    const { size, page } = this.props
    this.search(page, size)
  }

  search = (page: number, size: number) => {
    this.props.dispatch({
      type: `${namespace}/queryUserList`,
      payload: {
        pageSize: size,
        offset: page * size || 0
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

  closeModal2 = () => {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible2: false
      }
    })
  }

  // 编辑/新增用户
  changModal = (key: number, record?: any) => {
    // key: 1为新增 0为编辑
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: true,
        title: key ? '新增用户' : '编辑用户',
        editData: key ? {} : record || {},
        editId: record ? record.id : ''
      }
    })
    // 获取机构数据
    this.props.dispatch({
      type: `${commonspace}/getAllOrgList`
    })
  }

  // 分配角色
  openRole = async (id: string) => {
    // 获取角色列表
    await this.props.dispatch({
      type: `${namespace}/queryRoleList`,
      payload: {
        pageSize: 10,
        offset: 0
      }
    })
    // 获取当前用户已分配角色
    await this.props.dispatch({
      type: `${namespace}/getUserRole`,
      payload: {
        id
      }
    })
    await this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        editId: id,
        visible2: true
      }
    })
  }

  // 选择角色
  changRole = (val: string[]) => {
    this.setState({
      roleId: val
    })
  }

  // 确定分配角色
  confirmRole = () => {
    const { editId } = this.props
    const { roleId } = this.state
    this.props.dispatch({
      type: `${namespace}/submitRole`,
      payload: {
        userId: editId,
        roleIdStr: roleId.toString()
      },
      callback: () => {
        const userData = JSON.parse(getLocalStorage('userData') || '{}')
        this.props.dispatch({
          type: `${layoutspace}/getUserPermission`,
          payload: {
            id: userData.i
          }
        })
      }
    })
  }

  // 新增用户
  createUser = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/createUser`,
      payload: param
    })
  }

  // 编辑用户
  editUser = (param: object) => {
    const { editId } = this.props
    this.props.dispatch({
      type: `${namespace}/editUser`,
      payload: {
        ...param,
        id: editId
      }
    })
  }

  // 删除用户
  deleteUser = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/deleteUser`,
      payload: {
        id
      }
    })
  }

  render() {
    // const rowSelection = {}
    const {
      tableData,
      total,
      size,
      visible,
      visible2,
      title,
      orgList,
      roleList,
      roleArr,
      editData
    } = this.props
    return (
      <>
        <div className={styles.serchBox}>
          <div className={styles.serchItem}>
            <label>用户名：</label>
            <Input className={styles.input} />
          </div>
          <div className={styles.serchItem}>
            <label>邮箱：</label>
            <Input className={styles.input} />
          </div>
          <div className={styles.serchItem}>
            <label>电话：</label>
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
              onClick={() => this.changModal(1)}
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
            edit={(record: any) => this.changModal(0, record)}
            editRole={this.openRole}
            deleteUser={this.deleteUser}
            pageChange={this.pageChange}
            sizeChange={this.sizeChange}
          />
        </div>
        {/* 新增/编辑用户模态框 */}
        {visible ? (
          <Modal visible footer={null} title={title} onCancel={this.closeModal}>
            <EditUser
              editData={editData}
              isEdit={title === '编辑用户' ? 1 : 0}
              orgList={orgList}
              createUser={this.createUser}
              editUser={this.editUser}
            />
          </Modal>
        ) : null}
        {/* 分配角色模态框 */}
        <Modal
          visible={visible2}
          title='分配角色'
          onCancel={this.closeModal2}
          onOk={this.confirmRole}
        >
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='请选择角色～'
            onChange={this.changRole}
            defaultValue={roleArr}
            optionLabelProp='title'
          >
            {(roleList || []).map(item => (
              <Option title={item.name} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace],
  ...models[commonspace],
  ...models[layoutspace]
})
export default connect(mapStateToProps)(UserManager)
