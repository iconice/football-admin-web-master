import React, { Component } from 'react'
import { completeUrl } from '@/utils/tools'
import styles from './style.module.scss'

interface IProps {
  data: { [key: string]: any }
}
export default class TransferTab extends Component<IProps> {
  render() {
    const { data } = this.props
    const gradeFile = (data.entranceStudentFileList || []).filter(
      (it: { type: number }) => it.type === 1
    )
    const schoolFile = (data.entranceStudentFileList || []).filter(
      (it: { type: number }) => it.type === 2
    )
    const healthFile = (data.entranceStudentFileList || []).filter(
      (it: { type: number }) => it.type === 3
    )
    return (
      <>
        <div className={styles.infoItem}>
          <label className={styles.label}>转出学校名称：</label>
          <p className={styles.txt}>{data.outSchoolName}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>素质报告单/成绩单/班主任评语：</label>
          {gradeFile.map((it: any) => (
            <img
              src={completeUrl(it.fileId)}
              alt=''
              className={styles.img}
              key={it.id}
            />
          ))}
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>学籍号码：</label>
          <p className={styles.txt}>{data.studentNum}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>
            转出学校学籍卡（需加盖学籍章/公章）：
          </label>
          {schoolFile.map((it: any) => (
            <img
              src={completeUrl(it.fileId)}
              alt=''
              className={styles.img}
              key={it.id}
            />
          ))}
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>健康状况：</label>
          <p className={styles.txt}>{data.isHealth === 1 ? '健康' : '残疾'}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>有无学校体检表：</label>
          <p className={styles.txt}>{data.isHealthForm === 1 ? '有' : '无'}</p>
        </div>
        <div className={styles.infoItem}>
          <label className={styles.label}>
            {data.isHealthForm === 1
              ? '学校体检表：'
              : '医院入学常规体检报告（二级甲等以上）：'}
          </label>
          {healthFile.map((it: any) => (
            <img
              src={completeUrl(it.fileId)}
              alt=''
              className={styles.img}
              key={it.id}
            />
          ))}
        </div>
      </>
    )
  }
}
