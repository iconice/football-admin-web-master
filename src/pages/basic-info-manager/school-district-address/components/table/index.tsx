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
  edit: (record: any, type: number, key: number) => void
  deleteAdd: (id: string) => void
}
const MyTable = ({ data, edit, deleteAdd }: IProps) => (
  <Table dataSource={data} bordered>
    <Column title='名称 ' dataIndex='name' align='center' />
    <Column
      title='类型'
      dataIndex='type'
      align='center'
      render={text => (text === 1 ? '小区' : '街道地址')}
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
            onClick={() => edit(record, record.parentId === '0' ? 1 : 2, 0)}
          >
            编辑
          </Button>
          {record.parentId === '0' ? (
            <Button
              type='primary'
              className={styles.operateItem}
              onClick={() => edit(record, 2, 1)}
            >
              新增地址
            </Button>
          ) : null}
          <Popconfirm
            title='确定要删除该地址吗?'
            onConfirm={() => deleteAdd(record.id)}
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
