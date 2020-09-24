import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { namespace } from '@/models/basic-info-manager/class-manager'
import { namespace as commonspace } from '@/models/common/common'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { MyTable, EditClass } from './components'

interface Data {
  [key: string]: any
}
interface IProps {
  tableData: Array<ColumnProps<Data>>
  gradeList: any[]
  size: number
  page: number
  visible: boolean
  title: string
  total: number
  editData: { [key: string]: any } // 当前编辑的数据项
  orgList: any[]
  dispatch: IDispatch
}

class ClassManager extends Component<IProps> {
  componentDidMount() {
    this.init()
  }

  init = () => {
    const { size, page } = this.props
    this.search(page, size)
  }

  search = (page: number, size: number) => {
    this.props.dispatch({
      type: `${namespace}/queryClassList`,
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
      type: `${commonspace}/getAllGradeList`
    })
    await this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: true,
        title: key ? '新增班级' : '编辑班级',
        editData: key ? {} : record || {}
      }
    })
  }

  // 创建班级
  createClass = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/createClass`,
      payload: param
    })
  }

  // 编辑班级
  editClass = () => {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: true,
        title: '编辑年级'
      }
    })
  }

  // 编辑班级提交
  editConfirm = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/editClass`,
      payload: param
    })
  }

  // 删除班级
  deleteClass = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/deleteClass`,
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
      gradeList
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
            deleteClass={this.deleteClass}
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
          <EditClass
            addConfirm={this.createClass}
            editConfirm={this.editConfirm}
            editData={editData}
            isEdit={title === '编辑班级' ? 1 : 0}
            gradeData={gradeList}
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
export default connect(mapStateToProps)(ClassManager)
