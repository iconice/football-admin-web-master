import React, { Component } from 'react'
import { Form, Input, Button, Radio, Select, Upload, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styles from '../../style.module.scss'
import request from '@/utils/request'
import Config from '@/config'

const { baseUrl, imgUrl } = Config
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
  editData: { [key: string]: any }
  isEdit: number | boolean
  orgList: any[]
  createUser: (param: object) => void
  editUser: (param: object) => void
}

interface FormState {
  avatarUrl: string
  loading: boolean
  fileId: string
}

class MyForm extends Component<FormProps, FormState> {
  state = {
    avatarUrl:
      this.props.isEdit && this.props.editData.headUrl
        ? `${imgUrl}${this.props.editData.headUrl}`
        : '',
    fileId: '',
    loading: false
  }
  customRequest = async (info: any) => {
    await this.setState({
      loading: true
    })
    const formData = new FormData()
    formData.append('multipartFile', info.file)
    request(`${baseUrl}/entrance/file/fileUpload`, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res: any) => {
        const { headUrl, fileId } = res
        this.setState({
          fileId,
          loading: false,
          avatarUrl: `${imgUrl}${headUrl}`
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }
  submit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // 验证成功
        const { userName, name, email, tell, status, orgId } = values
        const { fileId } = this.state
        const param = {
          fileId,
          userName,
          name,
          email,
          tell,
          status,
          orgId: orgId || 0
        }
        const { isEdit, createUser, editUser } = this.props
        isEdit ? editUser(param) : createUser(param)
      }
    })
  }

  render() {
    const { editData, isEdit, orgList } = this.props
    const { getFieldDecorator } = this.props.form
    const { avatarUrl, loading } = this.state
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.submit}>
        <Form.Item label='上传头像：'>
          <Upload
            customRequest={(info: any) => this.customRequest(info)}
            listType='picture-card'
            showUploadList={false}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt='头像' style={{ width: '100%' }} />
            ) : (
              <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className='ant-upload-text'>点击上传</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label='用户名：'>
          {getFieldDecorator('userName', {
            initialValue: isEdit ? editData.userName : '',
            rules: [{ required: true, message: '请输入您的用户名!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='真实姓名：'>
          {getFieldDecorator('name', {
            initialValue: isEdit ? editData.name : '',
            rules: [{ required: true, message: '请输入您的真实姓名!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='邮箱：'>
          {getFieldDecorator('email', {
            initialValue: isEdit ? editData.email : ''
          })(<Input />)}
        </Form.Item>
        <Form.Item label='电话：'>
          {getFieldDecorator('tell', {
            initialValue: isEdit ? editData.tell : ''
          })(<Input />)}
        </Form.Item>
        <Form.Item label='用户状态：'>
          {getFieldDecorator('status', {
            initialValue: isEdit ? editData.status : '1'
          })(
            <Radio.Group>
              <Radio value='1'>启用</Radio>
              <Radio value='2'>禁用</Radio>
            </Radio.Group>
          )}
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
