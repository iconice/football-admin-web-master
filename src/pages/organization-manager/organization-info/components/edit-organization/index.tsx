import React, { Component } from 'react'
import { Form, Input, Button, Upload, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styles from '../../style.module.scss'
import request from '@/utils/request'
import Config from '@/config'

const { baseUrl, imgUrl } = Config

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
  onConfirm: (param: object) => void
  editData: { [key: string]: any }
  isEdit: number
}

interface FormState {
  businesspicId: string
  businesspicUrl: string
  loading1: boolean
  identitypicIds: string[]
  identitypicList: object[]
  loading2: boolean
  logoId: string
  logoUrl: string
  loading3: boolean
  hasLogo: boolean
  hasIdentity: boolean
  hasBusiness: boolean
}

class MyForm extends Component<FormProps, FormState> {
  state = {
    businesspicId:
      this.props.isEdit && this.props.editData.businesspicId
        ? this.props.editData.businesspicId
        : '',
    businesspicUrl:
      this.props.isEdit && this.props.editData.businesspic
        ? `${imgUrl}${this.props.editData.businesspic}`
        : '',
    loading1: false,
    identitypicIds:
      this.props.isEdit && this.props.editData.identitypicIds
        ? this.props.editData.identitypicIds.split(',')
        : [],
    identitypicList:
      this.props.isEdit &&
      this.props.editData.identitypics &&
      this.props.editData.identitypics.length
        ? this.props.editData.identitypics.map((it: string, index: number) => ({
            uid: index,
            name: `identity${index}`,
            url: `${imgUrl}${it}`
          }))
        : [],
    loading2: false,
    logoId:
      this.props.isEdit && this.props.editData.logoId
        ? this.props.editData.logoId
        : '',
    logoUrl:
      this.props.isEdit && this.props.editData.logo
        ? `${imgUrl}${this.props.editData.logo}`
        : '',
    loading3: false,
    hasLogo: true,
    hasIdentity: true,
    hasBusiness: true
  }

  // 上传logo
  uploadLogo = async (info: any) => {
    await this.setState({
      loading3: true
    })
    const formData = new FormData()
    formData.append('multipartFile', info.file)
    // businesskey: 1001用户头像 1002身份证 1003房产证
    request(`${baseUrl}/file/file/fileUpload?businesskey=1001`, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res: any) => {
        const { headUrl, fileId } = res
        this.setState({
          logoId: fileId,
          loading3: false,
          logoUrl: `${imgUrl}${headUrl}`,
          hasLogo: true
        })
      })
      .catch(() => {
        this.setState({
          loading3: false
        })
      })
  }

  // 上传营业执照
  uploadBusinesspic = async (info: any) => {
    await this.setState({
      loading1: true
    })
    const formData = new FormData()
    formData.append('multipartFile', info.file)
    // businesskey: 1001用户头像 1002身份证 1003房产证
    request(`${baseUrl}/file/file/fileUpload?businesskey=1001`, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res: any) => {
        const { headUrl, fileId } = res
        this.setState({
          businesspicId: fileId,
          loading1: false,
          businesspicUrl: `${imgUrl}${headUrl}`,
          hasBusiness: true
        })
      })
      .catch(() => {
        this.setState({
          loading1: false
        })
      })
  }

  // 上传身份证
  uploadIdentitypic = async (info: any) => {
    await this.setState({
      loading2: true
    })
    const { file } = info
    const formData = new FormData()
    formData.append('multipartFile', file)
    // businesskey: 1001用户头像 1002身份证 1003房产证
    request(`${baseUrl}/file/file/fileUpload?businesskey=1001`, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res: { [key: string]: any }) => {
        const { headUrl, fileId } = res
        const { identitypicIds, identitypicList } = this.state
        // @ts-ignore
        identitypicIds.push(fileId)
        const { uid, name } = file
        // @ts-ignore
        identitypicList.push({ uid, name, url: `${imgUrl}${headUrl}` })
        this.setState({
          identitypicIds,
          identitypicList,
          loading2: false,
          hasIdentity: identitypicList.length < 2 ? false : true
        })
      })
      .catch(() => {
        this.setState({
          loading2: false
        })
      })
  }

  handleChange = ({ fileList }: { fileList: object[] }) => {
    const { identitypicList } = this.state
    if (fileList.length < identitypicList.length) {
      this.setState({
        identitypicList: fileList
      })
    }
  }
  submit = async (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      const { logoId, businesspicId, identitypicIds } = this.state
      if (
        logoId.length &&
        businesspicId.length &&
        identitypicIds.length === 2 &&
        !err
      ) {
        // 验证成功
        const { orgName, worktype, intro, linkname, mobile, email } = values
        const param = {
          logoId,
          orgName,
          worktype,
          businesspicId,
          intro,
          linkname,
          mobile,
          email,
          identitypicIds: identitypicIds.toString()
        }
        this.props.onConfirm(param)
      } else {
        if (!logoId.length) {
          this.setState({
            hasLogo: false
          })
        }
        if (!businesspicId.length) {
          this.setState({
            hasBusiness: false
          })
        }
        if (identitypicIds.length < 2) {
          this.setState({
            hasIdentity: false
          })
        }
      }
    })
  }

  render() {
    const { editData, isEdit } = this.props
    const { getFieldDecorator } = this.props.form
    const {
      logoUrl,
      businesspicUrl,
      identitypicList,
      loading1,
      loading2,
      loading3,
      hasLogo,
      hasIdentity,
      hasBusiness
    } = this.state
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.submit}>
        <Form.Item label='机构logo：' required validateStatus='error'>
          <Upload
            customRequest={(info: any) => this.uploadLogo(info)}
            listType='picture-card'
            showUploadList={false}
          >
            {logoUrl ? (
              <img src={logoUrl} alt='logo' style={{ width: '100%' }} />
            ) : (
              <div>
                <Icon type={loading3 ? 'loading' : 'plus'} />
                <div className='ant-upload-text'>点击上传</div>
              </div>
            )}
          </Upload>
          {hasLogo ? null : <p className={styles.errorTxt}>请上传机构logo!</p>}
        </Form.Item>
        <Form.Item label='机构名称：'>
          {getFieldDecorator('orgName', {
            initialValue: isEdit ? editData.orgName : '',
            rules: [{ required: true, message: '请填写机构名称!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='机构性质：'>
          {getFieldDecorator('worktype', {
            initialValue: isEdit ? editData.worktype : '',
            rules: [{ required: true, message: '请填写机构性质!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='营业执照：' required validateStatus='error'>
          <Upload
            customRequest={(info: any) => this.uploadBusinesspic(info)}
            listType='picture-card'
            showUploadList={false}
          >
            {businesspicUrl ? (
              <img
                src={businesspicUrl}
                alt='营业执照'
                style={{ width: '100%' }}
              />
            ) : (
              <div>
                <Icon type={loading1 ? 'loading' : 'plus'} />
                <div className='ant-upload-text'>点击上传</div>
              </div>
            )}
          </Upload>
          {hasBusiness ? null : (
            <p className={styles.errorTxt}>请上传营业执照!</p>
          )}
        </Form.Item>
        <Form.Item label='简介：'>
          {getFieldDecorator('intro', {
            initialValue: isEdit ? editData.intro : '',
            rules: [{ required: true, message: '请输入机构简介!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='联系人姓名：'>
          {getFieldDecorator('linkname', {
            initialValue: isEdit ? editData.linkname : '',
            rules: [{ required: true, message: '请输入联系人姓名!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='联系人手机号：'>
          {getFieldDecorator('mobile', {
            initialValue: isEdit ? editData.mobile : '',
            rules: [{ required: true, message: '请输入联系人手机号!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='联系人邮箱：'>
          {getFieldDecorator('email', {
            initialValue: isEdit ? editData.email : '',
            rules: [{ required: true, message: '请填写联系人邮箱!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label='身份证照片：'
          required
          validateStatus='error'
          extra='请上传正反面身份证照片各一张'
        >
          <Upload
            customRequest={(info: any) => this.uploadIdentitypic(info)}
            listType='picture-card'
            fileList={identitypicList}
            onChange={this.handleChange}
          >
            {identitypicList.length >= 2 ? null : (
              <div>
                <Icon type={loading2 ? 'loading' : 'plus'} />
                <div className='ant-upload-text'>点击上传</div>
              </div>
            )}
          </Upload>
          {hasIdentity ? null : (
            <p className={styles.errorTxt}>请上传身份证照片!</p>
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
