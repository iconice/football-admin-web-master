import React, { Component } from 'react'
import { completeUrl } from '@/utils/tools'
import { relations } from '@/assets/commonData'
import styles from './style.module.scss'

interface IProps {
  data: { [key: string]: any }
  regionArr: any[]
}
export default class HouseTab extends Component<IProps> {
  render() {
    const { data, regionArr } = this.props
    const region = regionArr.filter(it => it.id === data.communityId)
    // 儿童出生证明
    const bornFile = (data.houseFileList || []).filter(
      (it: any) => it.type === 4
    )
    // 结婚证原件
    const wedFile = (data.houseFileList || []).filter(
      (it: any) => it.type === 3
    )
    // 房产证所有页
    const houseFile = (data.houseFileList || []).filter(
      (it: any) => it.type === 1
    )
    // 购房合同封面
    const homeFile = (data.houseFileList || []).filter(
      (it: any) => it.childType === 1
    )
    // 购房合同甲乙双方信息页
    const infoFile = (data.houseFileList || []).filter(
      (it: any) => it.childType === 2
    )
    // 购房合同房屋坐落地址信息页
    const addreFile = (data.houseFileList || []).filter(
      (it: any) => it.childType === 3
    )
    // 购房合同结房日期页
    const dateile = (data.houseFileList || []).filter(
      (it: any) => it.childType === 4
    )
    // 购房合同合同鲜章页
    const signFile = (data.houseFileList || []).filter(
      (it: any) => it.childType === 5
    )
    // 购房合同确认签字页
    const confirmFile = (data.houseFileList || []).filter(
      (it: any) => it.childType === 6
    )
    // 贷款/抵押合同所有页
    const collFile = (data.houseFileList || []).filter(
      (it: any) => it.subType === 6
    )
    // 房屋登记信息查询证明
    const searchFile = (data.houseFileList || []).filter(
      (it: any) => it.subType === 7
    )
    return (
      <>
        <div className={styles.infoTitle}>房产信息</div>
        <div className={styles.infoItem}>
          <label className={styles.label}>入住小区：</label>
          <p className={styles.txt}>{region.length ? region[0].name : ''}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>入住时间：</label>
          <p className={styles.txt}>{data.inTime}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>房屋坐落地址：</label>
          <p className={styles.txt}>{data.address}</p>
        </div>
        <div className={styles.infoTitle}>房产情况</div>
        <div className={styles.infoItem}>
          <label className={styles.label}>有无房产证：</label>
          <p className={styles.txt}>{data.type === 1 ? '有' : '无'}</p>
        </div>
        {data.type === 1 ? (
          <div className={styles.infoItem}>
            <label className={styles.label}>房产证所有页：</label>
            {houseFile.map((it: any) => (
              <img
                src={completeUrl(it.fileId)}
                alt=''
                className={styles.img}
                key={it.id}
              />
            ))}
          </div>
        ) : (
          <>
            <div className={styles.infoSubTitle}>购房合同</div>
            <div className={styles.infoItem}>
              <label className={styles.label}>封面：</label>
              <img
                src={completeUrl(homeFile.length ? homeFile[0].fileId : '')}
                alt=''
                className={styles.img}
              />
            </div>
            <div className={styles.infoItem}>
              <label className={styles.label}>买卖甲乙双方信息页：</label>
              <img
                src={completeUrl(infoFile.length ? infoFile[0].fileId : '')}
                alt=''
                className={styles.img}
              />
            </div>
            <div className={styles.infoItem}>
              <label className={styles.label}>房屋坐落地址信息页：</label>
              <img
                src={completeUrl(addreFile.length ? addreFile[0].fileId : '')}
                alt=''
                className={styles.img}
              />
            </div>
            <div className={styles.infoItem}>
              <label className={styles.label}>结房日期页：</label>
              <img
                src={completeUrl(dateile.length ? dateile[0].fileId : '')}
                alt=''
                className={styles.img}
              />
            </div>
            <div className={styles.infoItem}>
              <label className={styles.label}>合同鲜章页：</label>
              <img
                src={completeUrl(signFile.length ? signFile[0].fileId : '')}
                alt=''
                className={styles.img}
              />
            </div>
            <div className={styles.infoItem}>
              <label className={styles.label}>购房人确认签字页：</label>
              <img
                src={completeUrl(
                  confirmFile.length ? confirmFile[0].fileId : ''
                )}
                alt=''
                className={styles.img}
              />
            </div>
            <div className={styles.infoItem}>
              <label className={styles.label}>贷款/抵押合同所有页：</label>
              {collFile.map((it: any) => (
                <img
                  src={completeUrl(it.fileId)}
                  alt=''
                  className={styles.img}
                  key={it.id}
                />
              ))}
            </div>
            <div className={styles.infoItem}>
              <label className={styles.label}>房屋登记信息查询证明：</label>
              {searchFile.map((it: any) => (
                <img
                  src={completeUrl(it.fileId)}
                  alt=''
                  className={styles.img}
                  key={it.id}
                />
              ))}
            </div>
          </>
        )}
        <div className={styles.infoTitle}>房产权利人信息</div>
        {(data.housePeopleList || []).map((item: any) => {
          const relation = relations.filter(
            it => it.value === Number(item.relation)
          )
          return (
            <div className={styles.infoLine} key={item.id}>
              <div className={styles.infoWrap}>
                <div className={styles.infoItem}>
                  <label className={styles.label}>房产权利人姓名：</label>
                  <p className={styles.txt}>{item.name}</p>
                </div>
                <div className={styles.infoItem}>
                  <label className={styles.label}>与儿童的关系：</label>
                  <p className={styles.txt}>
                    {relation.length ? relation[0].name : ''}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
        <div className={styles.infoItem}>
          <label className={styles.label}>儿童出生证明：</label>
          <img
            src={completeUrl(bornFile.length ? bornFile[0].fileId : '')}
            alt=''
            className={styles.img}
          />
        </div>
        {wedFile.length ? (
          <div className={styles.infoItem}>
            <label className={styles.label}>结婚证原件：</label>
            <img
              src={completeUrl(wedFile[0].fileId)}
              alt=''
              className={styles.img}
            />
          </div>
        ) : null}
      </>
    )
  }
}
