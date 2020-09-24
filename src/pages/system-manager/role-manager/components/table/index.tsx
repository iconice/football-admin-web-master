import React from 'react'
import { ColumnProps } from 'antd/es/table'
import { Popconfirm, Button, Table } from 'antd'
import styles from '../../style.module.scss'

const { Column } = Table

interface Data {
  [key: string]: any
}

interface IProps {
  data: Array<ColumnProps<Data>>
  total: number
  size: number
  edit: (record: any) => void
  editPermission: (id: string) => void
  deleteRole: (id: string) => void
  pageChange: (page: number, pageSize?: number) => void
  sizeChange: (current: number, size: number) => void
  // rowSelection: object
}
const MyTable = ({
  data,
  total,
  size,
  edit,
  editPermission,
  deleteRole,
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
    <Column title='角色名称' dataIndex='name' align='center' />
    <Column title='角色描述' dataIndex='description' align='center' />
    <Column title='创建时间' dataIndex='createTime' align='center' />
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
            onClick={() => editPermission(record.id)}
          >
            分配权限
          </Button>
          <Popconfirm
            title='确定要删除该用户吗?'
            onConfirm={() => deleteRole(record.id)}
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
