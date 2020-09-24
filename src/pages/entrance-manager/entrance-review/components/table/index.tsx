import React from 'react'
import { ColumnProps } from 'antd/es/table'
import { Button, Table } from 'antd'
import { Link } from 'react-router-dom'
import styles from '../../style.module.scss'

const { Column } = Table

interface Data {
  key: number
  name: string
  age: number
  address: string
}

interface IProps {
  data: Array<ColumnProps<Data>>
  total: number
  size: number
  pageChange: (page: number, pageSize?: number) => void
  sizeChange: (current: number, size: number) => void
  // rowSelection: object
}
const MyTable = ({
  data,
  total,
  size,
  pageChange,
  sizeChange
}: // rowSelection
IProps) => (
  <Table
    dataSource={data}
    bordered
    // rowSelection={rowSelection}
    pagination={{
      total,
      defaultPageSize: size,
      showTotal: () => `共${total}条`,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: pageChange,
      onShowSizeChange: sizeChange
    }}
  >
    <Column title='申请名' dataIndex='title' align='center' />
    <Column
      title='申请类型'
      dataIndex='type'
      align='center'
      render={text => (
        <div className={styles.tabOperate}>{text === 1 ? '入学' : '转学'}</div>
      )}
    />
    <Column
      title='审核状态'
      dataIndex='status'
      align='center'
      render={text => (
        <div className={styles.tabOperate}>
          {text === 2 ? '待审核' : text === 3 ? '审核不通过' : '审核通过'}
        </div>
      )}
    />
    <Column
      title='提交时间'
      align='center'
      render={(text, record: any) => (
        <div className={styles.tabOperate}>
          {record.updateTime || record.createTime}
        </div>
      )}
    />
    <Column
      title='操作'
      align='center'
      dataIndex='operation'
      render={(text, record: any, index) => (
        <Link
          className={styles.tabOperate}
          to={{
            pathname: `/entrance_manager/review_detail/${record.id}/${record.type}`,
            state: { userId: record.userId }
          }}
        >
          <Button type='primary' className={styles.operateItem}>
            审核详情
          </Button>
        </Link>
      )}
    />
  </Table>
)

export default MyTable
