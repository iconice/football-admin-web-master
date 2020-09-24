import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'
import { namespace } from '@/models/home'
import { connect } from 'react-redux'

interface IProps {
  count: number
  dispatch: any
}
interface IState {
  page: string
}
class Home extends Component<IProps, IState> {
  state = {
    page: 'home'
  }

  add = () => {
    this.props.dispatch({
      type: `${namespace}/count`
    })
  }

  render() {
    const { page } = this.state
    const { count } = this.props
    return (
      <>
        <p className={styles.title}>this is {page} page</p>
        <Link to='/detail'>跳转到详情页</Link>
        <p style={{ color: 'green', fontSize: 16 }}>{count}</p>
        <div onClick={this.add}>点击加一</div>
      </>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(Home)
