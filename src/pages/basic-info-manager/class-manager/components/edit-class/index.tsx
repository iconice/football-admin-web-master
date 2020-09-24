import React, { PureComponent } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styles from '../../style.module.scss'

const { Option } = Select
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
  gradeData: any[]
  isEdit: boolean | number
}

class MyForm extends PureComponent<FormProps> {
  submit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // 验证成功
        const { className, gradId } = values
        const param = {
          className,
          gradId
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
    const { isEdit, editData, gradeData } = this.props
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.submit}>
        <Form.Item label='班级：'>
          {getFieldDecorator('className', {
            initialValue: isEdit ? editData.className : '',
            rules: [{ required: true, message: '请输入角色名称!' }]
          })(<Input placeholder='请填写班级（如2019级1班）～' />)}
        </Form.Item>
        <Form.Item label='所属年级：'>
          {getFieldDecorator('gradId', {
            initialValue: isEdit ? editData.gradId : '',
            rules: [{ required: true, message: '请选择所属年级!' }]
          })(
            <Select optionLabelProp='title' placeholder='请选择～'>
              {gradeData.map(item => (
                <Option title={item.gradeName} key={item.id}>
                  {item.gradeName}
                </Option>
              ))}
            </Select>
          )}
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
      gradeData: Form.createFormField(props.gradeData),
      editData: Form.createFormField({
        ...props.editData
      }),
      isEdit: Form.createFormField(props.isEdit)
    }
  }
})(MyForm)
