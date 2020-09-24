import React, { PureComponent } from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styles from '../../style.module.scss'
import { getLocalStorage } from '@/utils/storage'

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
  type: number // 1为小区 2为地址
}

class MyForm extends PureComponent<FormProps> {
  submit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // 验证成功
        const userData = JSON.parse(getLocalStorage('userData') || '{}')
        const { name, remark } = values
        const { isEdit, addConfirm, editConfirm, type, editData } = this.props
        const param = {
          name,
          remark,
          type,
          parentId: type === 1 ? 0 : isEdit ? editData.parentId : editData.id,
          orgId: userData.orgId
        }
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
    const { isEdit, editData, type } = this.props
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.submit}>
        <Form.Item label={type === 1 ? '小区名称：' : '街道地址：'}>
          {getFieldDecorator('name', {
            initialValue: isEdit ? editData.name : '',
            rules: [
              {
                required: true,
                message: type === 1 ? '请输入小区名称!' : '请输入接到地址！'
              }
            ]
          })(
            <Input
              placeholder={type === 1 ? '请填写小区名称' : '请填写接到地址'}
            />
          )}
        </Form.Item>
        <Form.Item label='备注：'>
          {getFieldDecorator('remark', {
            initialValue: isEdit ? editData.remark : ''
          })(<Input.TextArea rows={3} />)}
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
      type: Form.createFormField(props.type),
      editData: Form.createFormField({
        ...props.editData
      }),
      isEdit: Form.createFormField(props.isEdit)
    }
  }
})(MyForm)
