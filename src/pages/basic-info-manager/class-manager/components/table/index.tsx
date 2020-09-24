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
  deleteClass: (id: string) => void
  pageChange: (page: number, pageSize?: number) => void
  sizeChange: (current: number, size: number) => void
}
const MyTable = ({
  data,
  total,
  size,
  edit,
  deleteClass,
  pageChange,
  sizeChange
}: IProps) => (
  <Table
    dataSource={data}
    bordered
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
    <Column title='班级' dataIndex='className' align='center' />
    <Column title='所属年级' dataIndex='gradeName' align='center' />
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
          <Popconfirm
            title='确定要删除该班级吗?'
            onConfirm={() => deleteClass(record.id)}
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
