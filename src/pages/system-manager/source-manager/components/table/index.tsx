import React from 'react'
import { ColumnProps } from 'antd/es/table'
import { Popconfirm, Button, Table, Icon } from 'antd'
import styles from '../../style.module.scss'

const { Column } = Table

interface Data {
  id: string
  name: string
  url: string
  perms: string
  type: number
  icon: string
  orderNum: number
  description: string
}

interface IProps {
  data: Array<ColumnProps<Data>>
  edit: (record: any) => void
  deletePermission: (id: string) => void
  rowSelection: object
}
const MyTable = ({ data, edit, deletePermission }: IProps) => (
  <Table dataSource={data} bordered pagination={false}>
    <Column title='菜单名称' dataIndex='name' align='center' />
    <Column title='菜单URL' dataIndex='url' align='center' />
    <Column title='权限标识' dataIndex='perms' align='center' />
    <Column
      title='类型'
      dataIndex='type'
      align='center'
      render={text => (
        <div className={styles.tabOperate}>
          {text === '0' ? '目录' : text === '1' ? '菜单' : '按钮'}
        </div>
      )}
    />
    <Column
      title='图标'
      dataIndex='icon'
      align='center'
      render={text => <Icon type={text} />}
    />
    <Column title='排序' dataIndex='orderNum' align='center' />
    <Column title='权限描述' dataIndex='description' align='center' />
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
            title='确定要删除该菜单吗?'
            onConfirm={() => deletePermission(record.id)}
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
