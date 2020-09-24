import React, { Component } from 'react'
import { Form, Input, Button, Radio, Select } from 'antd'
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

interface FormVal {
  name: string
  type: number
  remark: string
  parentId: string
}

interface FormProps extends FormComponentProps {
  editData: { [key: string]: any }
  isEdit: number | boolean
  createAddress: (param: object) => void
  editAddress: (param: object) => void
  regionArr: any[] // 小区数组
}

class MyForm extends Component<FormProps> {
  submit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: FormVal) => {
      if (!err) {
        // 验证成功
        const { name, type, remark, parentId } = values
        const param = {
          name,
          type,
          remark,
          parentId: type === 1 ? '0' : parentId
        }
        const { isEdit, createAddress, editAddress } = this.props
        isEdit ? editAddress(param) : createAddress(param)
      }
    })
  }

  render() {
    const { editData, isEdit, regionArr } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const type: number = getFieldValue('type') || editData.type
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.submit}>
        <Form.Item label='名称：'>
          {getFieldDecorator('name', {
            initialValue: isEdit ? editData.name : '',
            rules: [{ required: true, message: '请输入小区名称或地址!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='类型：'>
          {getFieldDecorator('type', {
            initialValue: isEdit ? editData.type : 1
          })(
            <Radio.Group>
              <Radio value={1}>小区</Radio>
              <Radio value={2}>地址</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        {type === 2 && (
          <Form.Item label='所属小区：'>
            {getFieldDecorator('parentId', {
              initialValue:
                isEdit && editData.parentId !== '0'
                  ? editData.parentId
                  : regionArr[0].id,
              rules: [{ required: true, message: '地址类型的请选择所属小区!' }]
            })(
              <Select optionLabelProp='title' placeholder='请选择～'>
                {regionArr.map(item => (
                  <Option title={item.name} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        )}
        <Form.Item label='备注：'>
          {getFieldDecorator('remark', {
            initialValue: isEdit ? editData.remark : ''
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
