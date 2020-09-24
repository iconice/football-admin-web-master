import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { namespace } from '@/models/entrance-manager/address-manager'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { MyTable, EditAddress } from './components'

interface Data {
  id: number
  name: string
  type: number // 1为小区 2为地址
  remark: string
}
interface IProps {
  tableData: Array<ColumnProps<Data>>
  regionArr: Data[]
  total: number
  // size: number
  // page: number
  visible: boolean
  title: string
  editId: string
  editData: any
  dispatch: IDispatch
}
interface IState {
  addressId: string[]
}

class AddressManager extends Component<IProps, IState> {
  state = {
    addressId: []
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    this.props.dispatch({
      type: `${namespace}/queryList`
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
  }

  // 新增用户
  createAddress = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/createAddress`,
      payload: param
    })
  }

  // 编辑地址
  editAddress = (param: object) => {
    const { editId } = this.props
    this.props.dispatch({
      type: `${namespace}/editAddress`,
      payload: {
        ...param,
        id: editId
      }
    })
  }

  // 删除地址
  delAddress = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/delAddress`,
      payload: {
        id
      }
    })
  }

  render() {
    // const rowSelection = {}
    const { tableData, total, visible, title, editData, regionArr } = this.props
    return (
      <>
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
            // size={size}
            // rowSelection={rowSelection}
            edit={(record: any) => this.changModal(0, record)}
            delUser={this.delAddress}
            // pageChange={this.pageChange}
            // sizeChange={this.sizeChange}
          />
        </div>
        {/* 新增/编辑用户模态框 */}
        {visible ? (
          <Modal visible footer={null} title={title} onCancel={this.closeModal}>
            <EditAddress
              editData={editData}
              isEdit={title === '编辑用户' ? 1 : 0}
              createAddress={this.createAddress}
              editAddress={this.editAddress}
              regionArr={regionArr}
            />
          </Modal>
        ) : null}
      </>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(AddressManager)
