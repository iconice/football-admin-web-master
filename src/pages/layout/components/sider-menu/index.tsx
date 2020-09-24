import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { getLocalStorage } from '@/utils/storage'
import styles from './style.module.scss'

const { Sider } = Layout
const { SubMenu } = Menu

interface IProps {
  menuChange: (menuName: string, currentUrl: string) => void
  menuName: string
  siderData: any[]
}

interface IState {
  collapsed: boolean
  openKeys: string
}
export default class SiderMenu extends React.PureComponent<IProps, IState> {
  state = {
    collapsed: false,
    openKeys: ''
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed })
  }
  changeSelect = (val: any) => {
    const { key } = val
    this.props.menuChange(key.split(',')[0], key.split(',')[1])
  }
  openChange = (openKeys: string[]) => {
    this.setState({
      openKeys: openKeys.length
        ? openKeys.slice(openKeys.length - 1).toString()
        : ''
    })
  }
  render() {
    const { collapsed, openKeys } = this.state
    const { menuName, siderData } = this.props
    const currentUrl = getLocalStorage('currentUrl')
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        className={styles.sider}
      >
        <div className={styles.logo}>校园足球</div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[`${menuName},${currentUrl}`]}
          openKeys={[openKeys || menuName.split('|')[0]]}
          onSelect={(val: any) => this.changeSelect(val)}
          onOpenChange={this.openChange}
          className={styles.menu}
        >
          {siderData.map(item =>
            item.children && item.children.length ? (
              <SubMenu
                key={item.name}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span className='nav-text'>{item.name}</span>
                  </span>
                }
              >
                {item.children.map((it: any) => (
                  <Menu.Item
                    key={`${item.name}|${it.name},${item.url}${it.url}`}
                  >
                    <Link to={`${item.url}${it.url}`}>
                      <Icon type={it.icon} />
                      {it.name}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={`${item.name}|${item.name},${item.url}`}>
                <Link to={`${item.url}`}>
                  <Icon type={item.icon} />
                  {item.name}
                </Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
    )
  }
}
