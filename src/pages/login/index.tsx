import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styles from './style.module.scss'
import { namespace } from '@/models/login'
import { connect } from 'react-redux'

interface IProps {
  form: any
  dispatch: IDispatch
}

class Login extends Component<IProps> {
  login = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { username, password } = values
        // 登录
        this.props.dispatch({
          type: `${namespace}/login`,
          payload: {
            password,
            userName: username,
            grant_type: 'password'
          }
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.login}>
        <div className={styles.content}>
          <Form className={styles.form} onSubmit={this.login}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入您的用户名!' }]
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='用户名'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入正确的密码!' }]
              })(
                <Input.Password
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='密码'
                />
              )}
            </Form.Item>
            <Form.Item
              style={{ textAlign: 'right' }}
              className={styles.operateLine}
            >
              <Button type='primary' htmlType='submit' className={styles.btn}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
        <p className={styles.word}>
          Copyright © 2019. 重庆数聚汇通信息技术有限公司版权所有.
        </p>
      </div>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(Form.create({})(Login))
