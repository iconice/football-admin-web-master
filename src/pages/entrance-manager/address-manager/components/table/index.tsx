import React from 'react'
import { ColumnProps } from 'antd/es/table'
import { Popconfirm, Button, Table } from 'antd'
import styles from '../../style.module.scss'

const { Column } = Table

interface Data {
  id: number
  name: string
  type: number // 1为小区 2为地址
  remark: string
}

interface IProps {
  data: Array<ColumnProps<Data>>
  total: number
  edit: (record: any) => void
  delUser: (id: string) => void
}
const MyTable = ({ data, total, edit, delUser }: IProps) => (
  <Table
    dataSource={data}
    bordered
    // rowSelection={rowSelection}
    pagination={{
      total,
      defaultPageSize: 10,
      showTotal: () => `共${total}条`,
      showQuickJumper: true,
      showSizeChanger: true
    }}
  >
    <Column title='名称' dataIndex='name' align='center' />
    <Column
      title='类型'
      dataIndex='type'
      align='center'
      render={text => (
        <div className={styles.tabOperate}>
          {text === 1 ? '小区' : '街道地址'}
        </div>
      )}
    />
    <Column title='备注' dataIndex='remark' align='center' />
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
          {record.children && record.children.length ? null : (
            <Popconfirm
              title='确定删除该项吗?'
              onConfirm={() => delUser(record.id)}
              okText='确定'
              cancelText='取消'
            >
              <Button type='danger' className={styles.operateItem}>
                删除
              </Button>
            </Popconfirm>
          )}
        </div>
      )}
    />
  </Table>
)

export default MyTable
