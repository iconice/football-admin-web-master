import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { namespace } from '@/models/organization-manager/organization-info'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { MyTable, EditOrganization } from './components'

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
  total: number
  page: number
  size: number
  visible: boolean
  title: string
  editData: { [key: string]: any } // 当前编辑的数据项
  dispatch: IDispatch
}
interface IState {
  page: string
}

class OrganizationInfo extends Component<IProps, IState> {
  state = {
    page: 'UserManager'
  }

  componentDidMount() {
    this.search()
  }

  search = () => {
    const { page, size } = this.props
    this.props.dispatch({
      type: `${namespace}/queryOrgList`,
      payload: {
        offset: page * size,
        pageSize: size
      }
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
        title: key ? '新增机构' : '编辑机构',
        editData: key ? {} : record || {}
      }
    })
  }

  createOrg = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/createOrg`,
      payload: param
    })
  }

  delOrg = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/delOrg`,
      payload: {
        id
      }
    })
  }

  render() {
    const rowSelection = {}
    const { tableData, visible, title, editData } = this.props
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
            <Button
              shape='circle'
              icon='redo'
              className={styles.operateItem}
              onClick={this.search}
            />
          </div>
          <MyTable
            data={tableData}
            rowSelection={rowSelection}
            edit={(record: any) => this.openModal(0, record)}
            delOrg={this.delOrg}
          />
        </div>
        {visible ? (
          <Modal
            width={600}
            visible
            footer={null}
            title={title}
            onCancel={this.closeModal}
          >
            <EditOrganization
              editData={editData}
              onConfirm={this.createOrg}
              isEdit={title === '编辑机构' ? 1 : 0}
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
export default connect(mapStateToProps)(OrganizationInfo)
