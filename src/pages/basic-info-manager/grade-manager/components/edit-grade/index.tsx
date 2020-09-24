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
  orgList: any[]
  isEdit: boolean | number
}

class MyForm extends PureComponent<FormProps> {
  submit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // 验证成功
        const { gradeName, orgId } = values
        const param = {
          gradeName,
          orgId
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
    const { isEdit, editData, orgList } = this.props
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.submit}>
        <Form.Item label='年级：'>
          {getFieldDecorator('gradeName', {
            initialValue: isEdit ? editData.gradeName : '',
            rules: [{ required: true, message: '请输入角色名称!' }]
          })(<Input placeholder='请填写年级（如2019）～' />)}
        </Form.Item>
        <Form.Item label='所属机构：'>
          {getFieldDecorator('orgId', {
            initialValue: isEdit ? editData.orgId : '',
            rules: [{ required: true, message: '请选择所属机构!' }]
          })(
            <Select optionLabelProp='title' placeholder='请选择～'>
              {orgList.map(item => (
                <Option title={item.orgName} key={item.id}>
                  {item.orgName}
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
      orgList: Form.createFormField(props.orgList),
      editData: Form.createFormField({
        ...props.editData
      }),
      isEdit: Form.createFormField(props.isEdit)
    }
  }
})(MyForm)
