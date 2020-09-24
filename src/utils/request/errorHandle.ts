import { message } from 'antd'
import history from '@/utils/history'

const errorCode = {
  c10003: 10003, // 登录过期
  c240015: 240015,
  c240021: 240021
}

const rightCode = 10000 // 成功
const errorMsg = '报告！服务器出了点小问题，稍后再试试...'
// const loginNoInDate = '您的登陆信息已经过期,请重新登陆'

function handleCommonError(
  err: { [key: string]: any },
  config: { [key: string]: any }
) {
  const { code, message } = err
  switch (code) {
    case errorCode.c10003: {
      // 跳转到登陆页面
      history.replace('/login')
      window.location.reload()
      message.error(message)
      break
    }
    default: {
      if (!config.noErrorTip) {
        handleNoCommontError(err)
      }
    }
  }
}
function handleNoCommontError(err: any) {
  if (!err) {
    message.error(errorMsg)
  } else if (
    err.errorItems &&
    err.errorItems.length > 0 &&
    err.errorItems[0].message
  ) {
    message.error(err.errorItems[0].message)
  } else if (err.message) {
    message.error(err.message)
  } else {
    message.error(err)
  }
}
export {
  handleCommonError,
  handleNoCommontError,
  errorMsg,
  errorCode,
  rightCode
}
