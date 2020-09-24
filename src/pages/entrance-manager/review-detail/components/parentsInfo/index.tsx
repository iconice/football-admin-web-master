import React, { Component } from 'react'
import { relations } from '@/assets/commonData'
import styles from './style.module.scss'

interface IProps {
  data: any[]
}

export default class ParentsInfo extends Component<IProps> {
  render() {
    const { data } = this.props
    return (
      <div className={styles.infoLine}>
        {data.map(item => (
          <div className={styles.infoWrap} key={item.id}>
            <div className={styles.infoItem}>
              <label className={styles.label}>姓名：</label>
              <p className={styles.txt}>{item.name}</p>
            </div>
            <div className={styles.infoItem}>
              <label className={styles.label}>与儿童的关系：</label>
              <p className={styles.txt}>
                {relations.filter(it => it.value === item.relations)[0].name}
              </p>
            </div>
            <div className={styles.infoItem}>
              <label className={styles.label}>电话：</label>
              <p className={styles.txt}>{item.tell}</p>
            </div>
            {item.workUnits && (
              <div className={styles.infoItem}>
                <label className={styles.label}>工作单位：</label>
                <p className={styles.txt}>{item.workUnits}</p>
              </div>
            )}
            {item.dep && (
              <div className={styles.infoItem}>
                <label className={styles.label}>部门：</label>
                <p className={styles.txt}>{item.dep}</p>
              </div>
            )}
            {item.workUnitsTell && (
              <div className={styles.infoItem}>
                <label className={styles.label}>座机电话：</label>
                <p className={styles.txt}>{item.workUnitsTell}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
}
