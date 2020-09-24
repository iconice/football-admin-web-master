import React, { Component } from 'react'
import { Form, Input, Button, Radio, Icon, TreeSelect } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styles from '../../style.module.scss'

const { TreeNode } = TreeSelect

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    span: 24,
    offset: 0
  }
}

interface FormProps extends FormComponentProps {
  siderData: any[]
  onConfirm: (param: object) => void
  onEdit: (param: object) => void
  editData: { [key: string]: any }
  isEdit: number
}

class MyForm extends Component<FormProps> {
  submit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // 验证成功
        const {
          type,
          name,
          parentId,
          url,
          perms,
          orderNum,
          icon,
          status,
          description
        } = values
        const param = {
          type,
          name,
          parentId,
          url,
          perms,
          orderNum,
          icon,
          status,
          description
        }
        const { onConfirm, onEdit, isEdit, editData } = this.props
        if (isEdit) {
          onEdit({ id: editData.id, ...param })
        } else {
          onConfirm(param)
        }
      }
    })
  }

  render() {
    const { siderData, editData, isEdit } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const type = getFieldValue('type')
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.submit}>
        <Form.Item label='类型：'>
          {getFieldDecorator('type', {
            initialValue: isEdit ? editData.type : '1',
            rules: [{ required: true }]
          })(
            <Radio.Group>
              <Radio value='0'>目录</Radio>
              <Radio value='1'>菜单</Radio>
              <Radio value='2'>按钮</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='资源名称：'>
          {getFieldDecorator('name', {
            initialValue: isEdit ? editData.name : '',
            rules: [{ required: true, message: '请填写资源名称!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='上级资源'>
          {getFieldDecorator('parentId', {
            initialValue: isEdit ? editData.parentId : '',
            rules: [{ required: true, message: '请选择上级资源!' }]
          })(
            <TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder='请选择～'
              treeDefaultExpandAll
            >
              {siderData.map(item => (
                <TreeNode
                  value={item.id}
                  title={item.name}
                  key={item.id}
                  icon={<Icon type={item.icon} />}
                >
                  {(item.children || []).map((it: any) => (
                    <TreeNode
                      value={it.id}
                      title={it.name}
                      key={it.id}
                      icon={<Icon type={it.icon} />}
                    />
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
          )}
        </Form.Item>
        <Form.Item label='资源url：'>
          {getFieldDecorator('url', {
            initialValue: isEdit ? editData.url : '',
            rules: [{ required: true, message: '请输入资源url!' }]
          })(<Input />)}
        </Form.Item>
        {type !== '0' && (
          <Form.Item label='权限标识：'>
            {getFieldDecorator('perms', {
              initialValue: isEdit ? editData.perms : '',
              rules: [{ required: true, message: '请输入权限标识：!' }]
            })(<Input />)}
          </Form.Item>
        )}
        {type !== '2' && (
          <Form.Item label='排序：'>
            {getFieldDecorator('orderNum', {
              initialValue: isEdit ? editData.orderNum : '',
              rules: [{ required: true, message: '请输入序号!' }]
            })(<Input />)}
          </Form.Item>
        )}
        {type !== '2' && (
          <Form.Item label='图标：'>
            {getFieldDecorator('icon', {
              initialValue: isEdit ? editData.icon : '',
              rules: [{ required: true, message: '请输入图标名称!' }]
            })(<Input />)}
          </Form.Item>
        )}
        <Form.Item label='菜单状态：'>
          {getFieldDecorator('status', {
            initialValue: isEdit ? editData.status.toString() : '1'
          })(
            <Radio.Group>
              <Radio value='1'>有效</Radio>
              <Radio value='2'>无效</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='描述：'>
          {getFieldDecorator('description', {
            initialValue: isEdit ? editData.description : '',
            rules: [{ required: false }]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          style={{ textAlign: 'center' }}
          className={styles.operateLine}
          {...tailFormItemLayout}
        >
          <Button type='primary' htmlType='submit' className={styles.btn}>
            确定
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create<FormProps>({
  mapPropsToFields(props) {
    return {
      siderData: Form.createFormField(props.siderData),
      editData: Form.createFormField({
        ...props.editData
      }),
      isEdit: Form.createFormField(props.isEdit)
    }
  }
})(MyForm)
