import React from 'react'
import { ColumnProps } from 'antd/es/table'
import { Popconfirm, Button, Table, Switch } from 'antd'
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
  edit: (record: any) => void
  scan: (record: any) => void
  deleteTask: (id: string) => void
  onceRun: (id: string) => void
  changeStatus: (id: string, status: string) => void
  rowSelection: object
  pageChange: (page: number, pageSize?: number) => void
  sizeChange: (current: number, size: number) => void
}
const MyTable = ({
  data,
  total,
  size,
  edit,
  scan,
  deleteTask,
  onceRun,
  changeStatus,
  rowSelection,
  pageChange,
  sizeChange
}: IProps) => (
  <Table
    dataSource={data}
    bordered
    rowSelection={rowSelection}
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
    <Column
      title='任务编号'
      align='center'
      render={(text, record: any, index) => <>{index + 1}</>}
    />
    <Column title='任务名称' dataIndex='jobName' align='center' />
    <Column title='任务分组' dataIndex='jobGroup' align='center' />
    <Column title='调用目标字符串' dataIndex='invokeTarget' align='center' />
    <Column title='执行表达式' dataIndex='cronExpression' align='center' />
    <Column
      title='任务状态'
      dataIndex='status'
      align='center'
      render={(text, record: any, index) => (
        <Switch
          defaultChecked={text === '0' ? true : false}
          onChange={(val: boolean) => changeStatus(record.id, val ? '0' : '1')}
        />
      )}
    />
    <Column title='创建时间' dataIndex='updateTime' align='center' />
    <Column
      title='操作'
      align='center'
      dataIndex='operation'
      render={(text, record: any, index) => (
        <div className={styles.tabOperate}>
          <Button
            type='primary'
            className={styles.operateItem}
            onClick={() => edit(record)}
          >
            修改
          </Button>
          <Button
            className={styles.operateItem}
            onClick={() => scan(record)}
            icon='search'
          >
            详情
          </Button>
          <Button
            type='primary'
            className={styles.operateItem}
            onClick={() => onceRun(record.id)}
            icon='play-circle'
          >
            执行一次
          </Button>
          <Popconfirm
            title='确定要删除该任务吗?'
            onConfirm={() => deleteTask(record.id)}
            okText='确定'
            cancelText='取消'
          >
            <Button type='danger' className={styles.operateItem}>
              删除
            </Button>
          </Popconfirm>
        </div>
      )}
    />
  </Table>
)

export default MyTable
