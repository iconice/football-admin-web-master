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
  isEdit: boolean | number
}

class MyForm extends PureComponent<FormProps> {
  submit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // 验证成功
        const { year, semester } = values
        const param = {
          year,
          semester
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
        <Form.Item label='学年：'>
          {getFieldDecorator('year', {
            initialValue: isEdit ? editData.year : '',
            rules: [{ required: true, message: '请输入学年!' }]
          })(<Input placeholder='请填写年级（如2019-2020）～' />)}
        </Form.Item>
        <Form.Item label='学期：'>
          {getFieldDecorator('semester', {
            initialValue: isEdit ? editData.semester.toString() : '1',
            rules: [{ required: true, message: '请选择学期!' }]
          })(
            <Select optionLabelProp='title' placeholder='请选择～'>
              <Option title='上学期' key={1}>
                上学期
              </Option>
              <Option title='下学期' key={2}>
                下学期
              </Option>
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
      editData: Form.createFormField({
        ...props.editData
      }),
      isEdit: Form.createFormField(props.isEdit)
    }
  }
})(MyForm)
