import React, { Component } from 'react'
import { Form, Input, Button, Radio, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styles from '../../style.module.scss'

const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    span: 24,
    offset: 0
  }
}

interface FormProps extends FormComponentProps {
  editData: { [key: string]: any }
  isEdit: number | boolean
  isScan: number | boolean
  cronOk: boolean
  createTask: (param: object) => void
  editTask: (param: object) => void
  checkCronExpression: (cron: string) => void
}

class MyForm extends Component<FormProps> {
  submit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // 验证成功
        const {
          jobName,
          jobGroup,
          invokeTarget,
          cronExpression,
          misfirePolicy,
          concurrent,
          status
        } = values
        const param = {
          jobName,
          jobGroup,
          invokeTarget,
          cronExpression,
          misfirePolicy,
          concurrent,
          status
        }
        const { isEdit, createTask, editTask, editData } = this.props
        isEdit ? editTask({ jobId: editData.id, ...param }) : createTask(param)
      }
    })
  }

  render() {
    const { editData, isEdit, isScan, checkCronExpression, cronOk } = this.props
    const { getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form
    let editVals: { [key: string]: any } = {}
    editVals =
      isEdit && !Object.keys(editVals).length ? editData : getFieldsValue()
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.submit}>
        <Form.Item label='任务名称：'>
          {isScan
            ? editData.jobName
            : getFieldDecorator('jobName', {
                initialValue: editVals.jobName || '',
                rules: [{ required: true, message: '请输入任务名称!' }]
              })(<Input />)}
        </Form.Item>
        <Form.Item label='任务分组：'>
          {isScan
            ? editData.jobGroup
            : getFieldDecorator('jobGroup', {
                initialValue: editVals.jobGroup || '',
                rules: [{ required: true, message: '请输入任务分组!' }]
              })(<Input />)}
        </Form.Item>
        <Form.Item label='调用目标字符串：'>
          {isScan
            ? editData.invokeTarget
            : getFieldDecorator('invokeTarget', {
                initialValue: editVals.invokeTarget || '',
                rules: [{ required: true, message: '请输入调用目标字符串!' }]
              })(
                <div>
                  <Input />
                  <div className={styles.infoLine}>
                    <Icon
                      type='info-circle'
                      theme='filled'
                      style={{ marginRight: '5px' }}
                    />
                    <p>Bean调用示例：sjhtTask.sjhtParam('sjht')</p>
                  </div>
                  <div className={styles.infoLine}>
                    <Icon
                      type='info-circle'
                      theme='filled'
                      style={{ marginRight: '5px' }}
                    />
                    <p>
                      Class类调用示例：com.sjht.cloud.job.task.SjhtTask.sjhtParams('sjht')
                    </p>
                  </div>
                  <div className={styles.infoLine}>
                    <Icon
                      type='info-circle'
                      theme='filled'
                      style={{ marginRight: '5px' }}
                    />
                    <p>参数说明：支持字符串，布尔类型，长整型，浮点型，整型</p>
                  </div>
                </div>
              )}
        </Form.Item>
        <Form.Item label='cron表达式：'>
          {isScan
            ? editData.cronExpression
            : getFieldDecorator('cronExpression', {
                initialValue: editVals.cronExpression || '',
                rules: [
                  {
                    required: true,
                    message: '请输入cron表达式!'
                  },
                  {
                    validator: (rules, value, callback) => {
                      checkCronExpression(getFieldValue('cronExpression'))
                      if (!cronOk) {
                        callback('cron表达式不正确!')
                      }
                      callback()
                    }
                  }
                ]
              })(<Input />)}
        </Form.Item>
        <Form.Item label='执行策略：'>
          {isScan
            ? editData.misfirePolicy === '1'
              ? '立即执行'
              : editData.misfirePolicy === '2'
              ? '执行一次'
              : '放弃执行'
            : getFieldDecorator('misfirePolicy', {
                initialValue: editVals.misfirePolicy || '3'
              })(
                <Radio.Group>
                  <Radio value='1'>立即执行</Radio>
                  <Radio value='2'>执行一次</Radio>
                  <Radio value='3'>放弃执行</Radio>
                </Radio.Group>
              )}
        </Form.Item>
        <Form.Item label='并发执行：'>
          {isScan
            ? editData.concurrent
              ? '禁止'
              : '允许'
            : getFieldDecorator('concurrent', {
                initialValue: editVals.concurrent || '1'
              })(
                <Radio.Group>
                  <Radio value='0'>允许</Radio>
                  <Radio value='1'>禁止</Radio>
                </Radio.Group>
              )}
        </Form.Item>
        <Form.Item label='状态：'>
          {isScan
            ? editData.status
              ? '暂停'
              : '正常'
            : getFieldDecorator('status', {
                initialValue: editVals.status || '1'
              })(
                <Radio.Group>
                  <Radio value='0'>正常</Radio>
                  <Radio value='1'>暂停</Radio>
                </Radio.Group>
              )}
        </Form.Item>
        <Form.Item label='备注：'>
          {isScan
            ? editData.remark
            : getFieldDecorator('remark', {
                initialValue: editVals.remark || ''
              })(<TextArea rows={3} maxLength={200} />)}
        </Form.Item>
        <Form.Item
          style={{ textAlign: 'center' }}
          className={styles.operateLine}
          {...tailFormItemLayout}
        >
          <Button type='primary' htmlType='submit' className={styles.btn}>
            确定
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create<FormProps>({
  mapPropsToFields(props) {
    return {
      editData: Form.createFormField({
        ...props.editData
      }),
      isEdit: Form.createFormField(props.isEdit),
      isScan: Form.createFormField(props.isScan)
    }
  }
})(MyForm)
