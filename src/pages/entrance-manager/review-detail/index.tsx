import React, { Component } from 'react'
import { Tabs, Icon, Card, Radio, Input, Button, message } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { namespace } from '@/models/entrance-manager/review-detail'
import { namespace as addressSpace } from '@/models/entrance-manager/address-manager'
import styles from './style.module.scss'
import {
  ParentsInfo,
  CensusTab,
  HouseTab,
  IccineTab,
  TransferTab
} from './components'

const { TabPane } = Tabs
interface IProps extends RouteComponentProps {
  parentsInfo: any[]
  baseInfo: { [key: string]: any }
  houseInfo: { [key: string]: any }
  preventionInfo: { [key: string]: any }
  transInfo: { [key: string]: any }
  regionArr: any[]
  dispatch: IDispatch
}
interface IState {
  activeTab: string
  result: number
  resultMsg: string
}
class ReviewDetail extends Component<IProps, IState> {
  state = {
    activeTab: '1',
    result: 4, // 3为不通过，4为通过
    resultMsg: ''
  }

  componentDidMount() {
    // @ts-ignore
    const applyId = this.props.match.params.id
    // @ts-ignore
    const userId = this.props.location.state.userId
    // 获取父母信息
    this.props.dispatch({
      type: `${namespace}/getParentInfo`,
      payload: {
        id: userId
      }
    })
    // 获取儿童户籍信息
    this.getBaseInfo(applyId)
  }
  // 获取儿童户籍信息
  getBaseInfo = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/getEntranceBaseInfo`,
      payload: {
        id
      }
    })
  }

  // 获取房产信息
  getHouseInfo = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/getEntranceHouseInfo`,
      payload: {
        id
      }
    })
  }
  // 获取疫苗信息
  getPreventionInfo = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/getPreventionInfo`,
      payload: {
        id
      }
    })
  }
  // 获取转学儿童信息
  getTransInfo = (id: string) => {
    this.props.dispatch({
      type: `${namespace}/getTransInfo`,
      payload: {
        id
      }
    })
  }

  changeTab = (key: string) => {
    this.setState({
      activeTab: key,
      result: 4, // 3为不通过，4为通过
      resultMsg: ''
    })
    // @ts-ignore
    const applyId = this.props.match.params.id
    const { houseInfo, preventionInfo, transInfo } = this.props
    if (key === '2' && !Object.keys(houseInfo).length) {
      this.getHouseInfo(applyId)
      this.props.dispatch({
        type: `${addressSpace}/queryList`
      })
    } else if (key === '3' && !Object.keys(preventionInfo).length) {
      this.getPreventionInfo(applyId)
    } else if (key === '4' && !Object.keys(transInfo).length) {
      this.getTransInfo(applyId)
    }
  }

  // 提交审核
  submit = () => {
    const { activeTab, result, resultMsg } = this.state
    if (result === 3 && !resultMsg.length) {
      message.warning('请填写不通过的原因！')
      return
    }
    const { baseInfo, houseInfo, preventionInfo, transInfo } = this.props
    const appidArr = [
      baseInfo.id,
      houseInfo.id,
      preventionInfo.id,
      transInfo.id
    ]
    // @ts-ignore
    const applyId = this.props.match.params.id
    const param = {
      result,
      resultMsg,
      appid: applyId,
      type: Number(activeTab) - 1,
      subAppid: appidArr[Number(activeTab) - 1]
    }
    const that = this
    this.props.dispatch({
      type: `${namespace}/checkInfo`,
      payload: param,
      callback: () => {
        if (activeTab === '1') {
          that.getBaseInfo(applyId)
        } else if (activeTab === '2') {
          that.getHouseInfo(applyId)
        } else if (activeTab === '3') {
          that.getPreventionInfo(applyId)
        } else if (activeTab === '4') {
          that.getTransInfo(applyId)
        }
      }
    })
  }

  render() {
    const { activeTab, result, resultMsg } = this.state
    const {
      parentsInfo,
      baseInfo,
      houseInfo,
      preventionInfo,
      transInfo,
      regionArr
    } = this.props
    const infoArr = [baseInfo, houseInfo, preventionInfo, transInfo]
    const { feedback, status } = infoArr[Number(activeTab) - 1]
    // @ts-ignore
    const type = this.props.match.params.type // 1为入学 2为转学
    return (
      <div className={styles.reviewDetail}>
        {/* 家长信息 */}
        <Card title='家长信息' bordered={false}>
          <ParentsInfo data={parentsInfo} />
        </Card>
        {/* 审核信息 */}
        <Card title='审核信息' bordered={false} style={{ marginTop: 30 }}>
          <Tabs
            activeKey={activeTab}
            onChange={this.changeTab}
            type='card'
            tabBarGutter={16}
          >
            <TabPane
              tab={
                <span>
                  <Icon type='idcard' />
                  儿童户籍信息
                </span>
              }
              key='1'
            >
              <CensusTab data={baseInfo} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type='home' />
                  房产信息
                </span>
              }
              key='2'
            >
              <HouseTab data={houseInfo} regionArr={regionArr} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type='medicine-box' />
                  儿童接种查验
                </span>
              }
              key='3'
            >
              <IccineTab data={preventionInfo} />
            </TabPane>
            {type === '2' && (
              <TabPane
                tab={
                  <span>
                    <Icon type='interaction' />
                    转学儿童信息
                  </span>
                }
                key='4'
              >
                <TransferTab data={transInfo} />
              </TabPane>
            )}
          </Tabs>
          <div className={styles.checkBox}>
            {[3, 4].indexOf(Number(status)) > -1 ? (
              <div className={styles.infoItem}>
                <label className={styles.label}>审核结果：</label>
                <p className={styles.txt}>
                  {Number(status) === 3 ? '审核不通过' : '审核通过'}
                </p>
              </div>
            ) : (
              <div className={styles.infoItem}>
                <label className={styles.label}>审核是否通过：</label>
                <Radio.Group
                  value={result}
                  onChange={e =>
                    this.setState({
                      result: e.target.value
                    })
                  }
                >
                  <Radio value={3}>审核不通过</Radio>
                  <Radio value={4}>审核通过</Radio>
                </Radio.Group>
              </div>
            )}
          </div>
          {result === 3 || Number(status) === 3 ? (
            <div className={styles.infoItem}>
              <label className={styles.label}>不通过的原因：</label>
              {[3, 4].indexOf(Number(status)) > -1 ? (
                <p className={styles.txt}>{feedback}</p>
              ) : (
                <Input.TextArea
                  autoSize
                  className={styles.input}
                  style={{ flex: 1 }}
                  value={resultMsg}
                  onChange={(e: any) => {
                    this.setState({
                      resultMsg: e.target.value
                    })
                  }}
                />
              )}
            </div>
          ) : null}
          {[3, 4].indexOf(Number(status)) > -1 ? null : (
            <Button type='primary' onClick={this.submit}>
              提交
            </Button>
          )}
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (models: any) => ({
  ...models[namespace],
  ...models[addressSpace]
})
export default withRouter(connect(mapStateToProps)(ReviewDetail))
