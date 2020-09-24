import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { namespace } from '@/models/basic-info-manager/grade-manager'
import { namespace as commonspace } from '@/models/common/common'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { MyTable, EditGrade } from './components'

interface Data {
  [key: string]: any
}
interface IProps {
  tableData: Array<ColumnProps<Data>>
  size: number
  page: number
  visible: boolean
  title: string
  total: number
  editData: { [key: string]: any } // 当前编辑的数据项
  orgList: any[]
  dispatch: IDispatch
}

class GradeManager extends Component<IProps> {
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
      type: `${namespace}/queryGradeList`,
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

  openModal = async (key: number, record?: object) => {
    await this.props.dispatch({
      type: `${commonspace}/getAllOrgList`
    })
    await this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: true,
        title: key ? '新增年级' : '编辑年级',
        editData: key ? {} : record || {}
      }
    })
  }

  // 创建年级
  createGrade = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/createGrade`,
      payload: param
    })
  }

  // 编辑年级
  editGrade = () => {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: true,
        title: '编辑年级'
      }
    })
  }

  // 编辑年级提交
  editConfirm = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/editGrade`,
      payload: param
    })
  }

  // 删除年级
  deleteGrade = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/deleteGrade`,
      payload: {
        id
      }
    })
  }
  render() {
    const {
      tableData,
      visible,
      title,
      size,
      total,
      editData,
      orgList
    } = this.props
    return (
      <>
        <div className={styles.tabBox}>
          <div className={styles.operateLine}>
            <Button
              type='primary'
              className={styles.operateItem}
              onClick={this.init}
            >
              查询
            </Button>
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
              onClick={this.init}
            />
          </div>
          <MyTable
            data={tableData}
            total={total}
            size={size}
            edit={(record: any) => this.openModal(0, record)}
            deleteGrade={this.deleteGrade}
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
          <EditGrade
            addConfirm={this.createGrade}
            editConfirm={this.editConfirm}
            editData={editData}
            isEdit={title === '编辑年级' ? 1 : 0}
            orgList={orgList}
          />
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace],
  ...models[commonspace]
})
export default connect(mapStateToProps)(GradeManager)
