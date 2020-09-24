import React from 'react'
import { ColumnProps } from 'antd/es/table'
import { Popconfirm, Button, Table } from 'antd'
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
  delOrg: (id: string) => void
  rowSelection: object
}
const MyTable = ({ data, edit, delOrg }: IProps) => (
  <Table dataSource={data} bordered>
    <Column title='机构名称' dataIndex='orgName' align='center' />
    <Column title='机构性质' dataIndex='worktype' align='center' />
    <Column
      title='营业执照'
      dataIndex='businesspic'
      align='center'
      render={text => (
        <div className={styles.tabOperate}>
          {text === '0' ? '目录' : text === '1' ? '菜单' : '按钮'}
        </div>
      )}
    />
    <Column title='简介' dataIndex='intro' align='center' />
    <Column title='联系人姓名' dataIndex='linkname' align='center' />
    <Column title='联系人手机号' dataIndex='mobile' align='center' />
    <Column title='联系人邮箱' dataIndex='email' align='center' />
    <Column
      title='身份证照片'
      dataIndex='identitypic'
      align='center'
      render={text => (
        <div className={styles.tabOperate}>
          {text === '0' ? '目录' : text === '1' ? '菜单' : '按钮'}
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
          <Popconfirm
            title='确定要删除该菜单吗?'
            onConfirm={() => delOrg(record.id)}
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
