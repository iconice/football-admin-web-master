import React, { PureComponent } from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styles from '../../style.module.scss'

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
  addConfirm: (param: object) => void
  editConfirm: (param: object) => void
  editData: { [key: string]: any }
  isEdit: boolean | number
}

class MyForm extends PureComponent<FormProps> {
  submit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // 验证成功
        const { name, description } = values
        const param = {
          name,
          description
        }
        const { isEdit, addConfirm, editConfirm } = this.props
        if (isEdit) {
          const { editData } = this.props
          editConfirm({ ...param, id: editData.id })
        } else {
          addConfirm(param)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { isEdit, editData } = this.props
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.submit}>
        <Form.Item label='角色名称：'>
          {getFieldDecorator('name', {
            initialValue: isEdit ? editData.name : '',
            rules: [{ required: true, message: '请输入角色名称!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='角色描述：'>
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
      editData: Form.createFormField({
        ...props.editData
      }),
      isEdit: Form.createFormField(props.isEdit)
    }
  }
})(MyForm)
