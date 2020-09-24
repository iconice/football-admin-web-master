import React from 'react'
import { Layout, Dropdown, Menu, Modal, Input, message } from 'antd'
import styles from './style.module.scss'
import * as imgs from '@/assets/images'
import { namespace } from '@/models/login'
import { getLocalStorage } from '@/utils/storage'
import { connect } from 'react-redux'
import Config from '@/config'

const { imgUrl } = Config
const { Header } = Layout

interface IState {
  visible: boolean
  oldPass: string
  newPass: string
  confirmNewPass: string
}

class MyHeader extends React.PureComponent<any, IState> {
  state = {
    visible: false,
    oldPass: '',
    newPass: '',
    confirmNewPass: ''
  }
  menuClick = (e: any) => {
    const { key } = e
    const that = this
    if (key === '0') {
      // 修改密码
      this.setState({
        visible: true
      })
    } else {
      // 退出系统
      Modal.confirm({
        title: '提示',
        content: '确定退出系统吗？',
        onOk() {
          that.loginOut()
        },
        onCancel() {}
      })
    }
  }

  loginOut = () => {
    this.props.dispatch({
      type: `${namespace}/loginOut`
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  // 修改密码
  changePassword = () => {
    const { oldPass, newPass, confirmNewPass } = this.state
    if (!oldPass.length || !newPass.length || !confirmNewPass.length) {
      message.error('请输入完整的修改信息～')
      return
    }
    if (confirmNewPass !== newPass) {
      message.error('两次输入的新密码不一致～')
      return
    }
  }
  render() {
    const { visible, oldPass, newPass, confirmNewPass } = this.state
    const userData = JSON.parse(getLocalStorage('userData') || '{}')
    return (
      <Header className={styles.header}>
        <div className={styles.headerLine}>
          <img alt='' src={imgs.Logo} className={styles.logo} />
          <Dropdown
            className={styles.userBox}
            overlay={
              <Menu onClick={e => this.menuClick(e)}>
                <Menu.Item key='0'>
                  <span>修改密码</span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key='1'>
                  <span>退出系统</span>
                </Menu.Item>
              </Menu>
            }
          >
            <div className={styles.user}>
              <img
                alt=''
                src={
                  Object.keys(userData).length && userData.headUrl
                    ? `${imgUrl}${userData.headUrl}`
                    : imgs.Avatar
                }
                className={styles.avatar}
              />
              <p>
                {Object.keys(userData).length && userData.user_name
                  ? userData.user_name
                  : ''}
              </p>
            </div>
          </Dropdown>
        </div>
        <Modal
          title='修改密码'
          visible={visible}
          onCancel={this.handleCancel}
          onOk={this.changePassword}
        >
          <div className={styles.inputItem}>
            <label className={styles.label}>旧密码：</label>
            <Input.Password
              className={styles.input}
              placeholder='请输入旧密码～'
              value={oldPass}
              onChange={e =>
                this.setState({
                  oldPass: e.target.value
                })
              }
            />
          </div>
          <div className={styles.inputItem}>
            <label className={styles.label}>新密码：</label>
            <Input.Password
              className={styles.input}
              placeholder='请输入新密码～'
              value={newPass}
              onChange={e =>
                this.setState({
                  newPass: e.target.value
                })
              }
            />
          </div>
          <div className={styles.inputItem}>
            <label className={styles.label}>确认新密码：</label>
            <Input.Password
              className={styles.input}
              placeholder='请确认新密码～'
              value={confirmNewPass}
              onChange={e =>
                this.setState({
                  confirmNewPass: e.target.value
                })
              }
            />
          </div>
        </Modal>
      </Header>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(MyHeader)
