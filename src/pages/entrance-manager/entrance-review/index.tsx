import React, { Component } from 'react'
import { Input, Button, Select } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { namespace } from '@/models/entrance-manager/entrance-review'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { MyTable } from './components'

const { Option } = Select

const statusArr = [
  {
    value: 2,
    name: '待审核'
  },
  {
    value: 3,
    name: '审核不通过'
  },
  {
    value: 4,
    name: '审核通过'
  }
]

const typeArr = [
  {
    value: 0,
    name: '全部'
  },
  {
    value: 1,
    name: '入学'
  },
  {
    value: 2,
    name: '转学'
  }
]
interface Data {
  key: number
  name: string
  age: number
  address: string
}
interface IProps extends RouteComponentProps {
  tableData: Array<ColumnProps<Data>>
  total: number
  size: number
  page: number
  dispatch: IDispatch
}
interface IState {
  userName: string
  status: number
  type: number
}

class EntranceReview extends Component<IProps, IState> {
  state = {
    userName: '',
    status: 2,
    type: 0
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    const { size, page } = this.props
    this.search(page, size)
  }

  search = (page: number, size: number) => {
    const { userName, status, type } = this.state
    this.props.dispatch({
      type: `${namespace}/queryApplyList`,
      payload: {
        userName,
        status,
        type,
        pageSize: size,
        offset: page || 1
      }
    })
  }

  // 分页查询
  pageChange = (page: number, pageSize?: number) => {
    const { size } = this.props
    this.search(page, pageSize || size)
  }

  // 每页展示条数更改
  sizeChange = (current: number, size: number) => {
    this.search(current, size)
  }

  render() {
    const { userName, status, type } = this.state
    const { tableData, total, size } = this.props
    return (
      <>
        <div className={styles.serchBox}>
          <div className={styles.serchItem}>
            <label>用户名：</label>
            <Input
              className={styles.input}
              value={userName}
              onChange={(e: any) => {
                this.setState({
                  userName: e.detail.value
                })
              }}
            />
          </div>
          <div className={styles.serchItem}>
            <label>审核状态：</label>
            <Select
              defaultValue={status}
              placeholder='请选择～'
              style={{ flex: 1 }}
              onChange={(val: number) => {
                this.setState({
                  status: val
                })
              }}
            >
              {statusArr.map(item => (
                <Option value={item.value} key={`status${item.value}`}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.serchItem}>
            <label>类型：</label>
            <Select
              defaultValue={type}
              placeholder='请选择～'
              style={{ flex: 1 }}
              onChange={(val: number) => {
                this.setState({
                  type: val
                })
              }}
            >
              {typeArr.map(item => (
                <Option value={item.value} key={`type${item.value}`}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <Button type='primary' onClick={this.init}>
            查询
          </Button>
        </div>
        <div className={styles.tabBox}>
          <div className={styles.operateLine}>
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
            pageChange={this.pageChange}
            sizeChange={this.sizeChange}
          />
        </div>
      </>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default withRouter(connect(mapStateToProps)(EntranceReview))
