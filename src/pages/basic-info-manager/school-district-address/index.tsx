import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { namespace } from '@/models/basic-info-manager/school-district-address'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { MyTable, EditAddress } from './components'

interface Data {
  [key: string]: any
}
interface IProps {
  tableData: Array<ColumnProps<Data>>
  siderData: any[]
  total: number
  size: number
  visible: boolean
  title: string
  editData: { [key: string]: any } // 当前编辑的数据项
  isEdit: boolean | number
  type: number
  dispatch: IDispatch
}
interface IState {
  page: string
}

class SchoolDistrictAddress extends Component<IProps, IState> {
  state = {
    page: 'UserManager'
  }

  componentDidMount() {
    this.search()
  }

  search = () => {
    this.props.dispatch({
      type: `${namespace}/queryAddList`
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
  openModal = (key: number, type: number, record?: object) => {
    // key：1为新增，0为编辑
    // type: 1为小区，2为地址
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: true,
        isEdit: !key,
        title:
          type === 1
            ? key
              ? '新增小区'
              : '编辑小区'
            : key
            ? '新增地址'
            : '编辑地址',
        editData: record && Object.keys(record).length ? record : {},
        type
      }
    })
    this.props.dispatch({
      type: `${namespace}/getCatalogPermissionList`
    })
  }

  createAdd = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/createAdd`,
      payload: param
    })
  }

  deleteAdd = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/deleteAdd`,
      payload: {
        id
      }
    })
  }
  editAdd = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/editAdd`,
      payload: param
    })
  }

  render() {
    const { tableData, visible, title, editData, isEdit, type } = this.props
    return (
      <>
        <div className={styles.tabBox}>
          <div className={styles.operateLine}>
            <Button
              type='primary'
              icon='plus'
              className={styles.operateItem}
              onClick={() => this.openModal(1, 1)}
            >
              新增
            </Button>
            <Button
              shape='circle'
              icon='redo'
              className={styles.operateItem}
              onClick={this.search}
            />
          </div>
          <MyTable
            data={tableData}
            edit={(record: any, type: number, key: number) =>
              this.openModal(key, type, record)
            }
            deleteAdd={this.deleteAdd}
          />
        </div>
        <Modal
          visible={visible}
          footer={null}
          title={title}
          onCancel={this.closeModal}
        >
          <EditAddress
            editData={editData}
            addConfirm={this.createAdd}
            editConfirm={this.editAdd}
            isEdit={isEdit}
            type={type}
          />
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(SchoolDistrictAddress)
