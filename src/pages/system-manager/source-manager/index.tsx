import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { namespace } from '@/models/system-manager/source-manager'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { MyTable, EditSource } from './components'

interface Data {
  id: string
  name: string
  url: string
  perms: string
  type: number
  icon: string
  orderNum: number
  description: string
}
interface IProps {
  tableData: Array<ColumnProps<Data>>
  siderData: any[]
  total: number
  size: number
  visible: boolean
  title: string
  editData: { [key: string]: any } // 当前编辑的数据项
  dispatch: IDispatch
}
interface IState {
  page: string
}

class SourceManager extends Component<IProps, IState> {
  state = {
    page: 'UserManager'
  }

  componentDidMount() {
    this.props.dispatch({
      type: `${namespace}/getPermissionList`
    })
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

  // 显示模态框
  openModal = (key: number, record?: object) => {
    // key：1为新增，0为编辑
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: true,
        title: key ? '新增资源' : '编辑资源',
        editData: key ? {} : record
      }
    })
    this.props.dispatch({
      type: `${namespace}/getCatalogPermissionList`
    })
  }

  createPermission = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/createPermission`,
      payload: param
    })
  }

  deletePermission = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/deletePermission`,
      payload: {
        id
      }
    })
  }
  editPermission = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/editPermission`,
      payload: param
    })
  }

  render() {
    const rowSelection = {}
    const { tableData, siderData, visible, title, editData } = this.props
    return (
      <>
        <div className={styles.tabBox}>
          <div className={styles.operateLine}>
            <Button
              type='primary'
              icon='plus'
              className={styles.operateItem}
              onClick={() => this.openModal(1)}
            >
              新增
            </Button>
          </div>
          <MyTable
            data={tableData}
            rowSelection={rowSelection}
            edit={(record: any) => this.openModal(0, record)}
            deletePermission={this.deletePermission}
          />
        </div>
        <Modal
          visible={visible}
          footer={null}
          title={title}
          onCancel={this.closeModal}
        >
          <EditSource
            siderData={siderData}
            editData={editData}
            onConfirm={this.createPermission}
            onEdit={this.editPermission}
            isEdit={title === '编辑资源' ? 1 : 0}
          />
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(SourceManager)
