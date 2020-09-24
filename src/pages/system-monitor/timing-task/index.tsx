import React, { Component } from 'react'
import { Input, Button, Modal, Select } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { namespace } from '@/models/system-monitor/timing-task'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { MyTable, EditTask } from './components'

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
  title: string
  editId: string
  editData: any
  cronOk: boolean
  dispatch: IDispatch
}
interface IState {
  roleId: string[]
}

class TimingTask extends Component<IProps, IState> {
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
      type: `${namespace}/queryTaskList`,
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

  // 编辑/新增/查看任务
  changModal = (key: number, record?: any) => {
    // key: 1为新增 0为编辑 2为查看详情
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        visible: true,
        title: key === 1 ? '新增任务' : key === 2 ? '任务详情' : '编辑任务',
        editData: key === 1 ? {} : record || {},
        editId: record ? record.id : '',
        cronOk: true
      }
    })
  }

  // 检查执行表达式是否正确
  checkCronExpression = (cron: string) => {
    this.props.dispatch({
      type: `${namespace}/checkCronExpression`,
      payload: {
        cron
      }
    })
  }

  // 新增任务
  createTask = (param: object) => {
    this.props.dispatch({
      type: `${namespace}/createTask`,
      payload: param
    })
  }

  // 编辑任务
  editTask = (param: object) => {
    const { editId } = this.props
    this.props.dispatch({
      type: `${namespace}/editTask`,
      payload: {
        ...param,
        id: editId
      }
    })
  }

  // 删除任务
  deleteTask = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/deleteTask`,
      payload: {
        id
      }
    })
  }

  // 立即执行一次
  onceRun = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/onceRun`,
      payload: {
        id
      }
    })
  }

  // 状态切换
  changeStatus = (id: string, status: string) => {
    this.props.dispatch({
      type: `${namespace}/changeStatus`,
      payload: {
        id,
        status
      }
    })
  }

  render() {
    const rowSelection = {}
    const {
      tableData,
      total,
      size,
      visible,
      title,
      editData,
      cronOk
    } = this.props
    return (
      <>
        <div className={styles.serchBox}>
          <div className={styles.serchItem}>
            <label>任务名：</label>
            <Input className={styles.input} />
          </div>
          <div className={styles.serchItem}>
            <label>任务分组：</label>
            <Select
              style={{ width: '100%' }}
              defaultValue={['1']}
              optionLabelProp='title'
              className={styles.input}
            >
              <Option title='所有' key={1}>
                所有
              </Option>
              <Option title='默认' key={2}>
                默认
              </Option>
              <Option title='所有' key={3}>
                系统
              </Option>
            </Select>
          </div>
          <div className={styles.serchItem}>
            <label>任务状态：</label>
            <Select
              style={{ width: '100%' }}
              defaultValue={['1']}
              optionLabelProp='title'
              className={styles.input}
            >
              <Option title='所有' key={1}>
                所有
              </Option>
              <Option title='正常' key={2}>
                正常
              </Option>
              <Option title='暂停' key={3}>
                暂停
              </Option>
            </Select>
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
            <Button icon='vertical-align-bottom' className={styles.operateItem}>
              导出
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
            rowSelection={rowSelection}
            edit={(record: any) => this.changModal(0, record)}
            scan={(record: any) => this.changModal(2, record)}
            deleteTask={this.deleteTask}
            onceRun={this.onceRun}
            changeStatus={this.changeStatus}
            pageChange={this.pageChange}
            sizeChange={this.sizeChange}
          />
        </div>
        {/* 新增/编辑任务模态框 */}
        {visible ? (
          <Modal
            width={650}
            visible
            footer={null}
            title={title}
            onCancel={this.closeModal}
          >
            <EditTask
              editData={editData}
              isEdit={title === '编辑任务' ? 1 : 0}
              isScan={title === '任务详情' ? 1 : 0}
              cronOk={cronOk}
              createTask={this.createTask}
              editTask={this.editTask}
              checkCronExpression={this.checkCronExpression}
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
export default connect(mapStateToProps)(TimingTask)
