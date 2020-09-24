import React, { Component } from 'react'
import { completeUrl } from '@/utils/tools'
import styles from './style.module.scss'

interface IProps {
  data: { [key: string]: any }
}
export default class InccineTab extends Component<IProps> {
  render() {
    const { data } = this.props
    const file1: any[] = (data.fileList || []).filter(
      (it: { type: number }) => it.type === 2
    )
    const file2: any[] = (data.fileList || []).filter(
      (it: { type: number }) => it.type === 1
    )
    return (
      <>
        <div className={styles.infoItem}>
          <label className={styles.label}>预防接种证所有页照片：</label>
          {file1.map((it: any) => (
            <img
              src={completeUrl(it.fileId)}
              alt=''
              className={styles.img}
              key={it.id}
            />
          ))}
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>是否完成预防接种查验：</label>
          <p className={styles.txt}>{file2.length ? '是' : '否'}</p>
        </div>
        {file2.length ? (
          <div className={styles.infoItem}>
            <label className={styles.label}>预防接种证所有页照片：</label>
            {file2.map((it: any) => (
              <img
                src={completeUrl(it.fileId)}
                alt=''
                className={styles.img}
                key={it.id}
              />
            ))}
          </div>
        ) : null}
      </>
    )
  }
}
