import React from 'react'
import { ColumnProps } from 'antd/es/table'
import { Popconfirm, Button, Table } from 'antd'
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
  editRole: (id: string) => void
  deleteUser: (id: string) => void
  pageChange: (page: number, pageSize?: number) => void
  sizeChange: (current: number, size: number) => void
  // rowSelection: object
}
const MyTable = ({
  data,
  total,
  size,
  edit,
  editRole,
  deleteUser,
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
    <Column title='真实姓名' dataIndex='name' align='center' />
    <Column title='用户名' dataIndex='userName' align='center' />
    <Column title='邮箱' dataIndex='email' align='center' />
    <Column title='电话' dataIndex='tell' align='center' />
    <Column
      title='用户状态'
      dataIndex='status'
      align='center'
      render={text => (
        <div className={styles.tabOperate}>
          {text === '1' ? '启用' : '禁用'}
        </div>
      )}
    />
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
            编辑
          </Button>
          <Button
            type='primary'
            className={styles.operateItem}
            onClick={() => editRole(record.id)}
          >
            分配角色
          </Button>
          <Popconfirm
            title='确定要删除该用户吗?'
            onConfirm={() => deleteUser(record.id)}
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
