import { Layout, Breadcrumb } from 'antd'
import React, { ReactNode } from 'react'
import { namespace } from '@/models/common/layout'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import { Header, SiderMenu } from './components'

const { Content } = Layout

interface IProps {
  menuName: string
  siderData: any[]
  children?: ReactNode
  dispatch: IDispatch
}

class BasicLayout extends React.PureComponent<IProps> {
  public static defaultProps: Partial<IProps> = {
    children: <></>,
    dispatch: () => {}
  }
  componentDidMount() {
    // 获取用户菜单
    const userData = JSON.parse(getLocalStorage('userData') || '{}')
    this.props.dispatch({
      type: `${namespace}/getUserPermission`,
      payload: {
        id: userData.id
      }
    })
  }
  // 菜单切换
  menuChange = (menuName: string, currentUrl: string) => {
    setLocalStorage('menuName', menuName)
    setLocalStorage('currentUrl', currentUrl)
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: {
        menuName
      }
    })
  }
  render() {
    const { menuName, siderData } = this.props
    const menuArr = (getLocalStorage('menuName') || menuName).split('|')
    return (
      <Layout>
        <Header />
        <Layout className={styles.wrapper}>
          <SiderMenu
            menuChange={this.menuChange}
            menuName={getLocalStorage('menuName') || menuName}
            siderData={siderData}
          />
          <Layout className={styles.rightCon}>
            <Breadcrumb className={styles.bread}>
              {(menuArr || []).map((item, index) => (
                <Breadcrumb.Item key={`menu${index}`}>{item}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <Content className={styles.content}>{this.props.children}</Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(BasicLayout)
