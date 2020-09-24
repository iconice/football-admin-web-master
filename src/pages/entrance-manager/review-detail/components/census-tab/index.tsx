import React, { Component } from 'react'
import { completeUrl } from '@/utils/tools'
import { relations } from '@/assets/commonData'
import styles from './style.module.scss'

interface IProps {
  data: { [key: string]: any }
}
export default class CensusTab extends Component<IProps> {
  render() {
    const { data } = this.props
    const relation = (relations || []).filter(it => it.value === data.relation)
    return (
      <>
        <div className={styles.infoTitle}>儿童信息</div>
        <div className={styles.infoItem}>
          <label className={styles.label}>儿童姓名：</label>
          <p className={styles.txt}>{data.childName}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>儿童性别：</label>
          <p className={styles.txt}>{data.childSex === 1 ? '男' : '女'}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>儿童身份证号：</label>
          <p className={styles.txt}>{data.idCard}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>儿童近期免冠2寸照片：</label>
          <img
            src={completeUrl(data.childHeadFileId)}
            alt=''
            className={styles.img}
          />
        </div>
        <div className={styles.infoTitle}>户籍信息</div>
        <div className={styles.infoItem}>
          <label className={styles.label}>户主姓名：</label>
          <p className={styles.txt}>{data.masterName}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>与儿童关系：</label>
          <p className={styles.txt}>
            {relation.length ? relation[0].name : ''}
          </p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>电话：</label>
          <p className={styles.txt}>{data.tell}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>户口本地址：</label>
          <p className={styles.txt}>{data.address}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>户口地址页：</label>
          <img
            src={completeUrl(data.masterFileId)}
            alt=''
            className={styles.img}
          />
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>户口信息页：</label>
          <img
            src={completeUrl(data.masterInfoFileId)}
            alt=''
            className={styles.img}
          />
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>户口入学儿童信息页：</label>
          <img
            src={completeUrl(data.childInfoFileId)}
            alt=''
            className={styles.img}
          />
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>户口增减页：</label>
          <img
            src={completeUrl(data.modifyFileId)}
            alt=''
            className={styles.img}
          />
        </div>
      </>
    )
  }
}
