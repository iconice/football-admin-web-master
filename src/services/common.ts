import request from '@/utils/request'
import { getLocalStorage } from '@/utils/storage'

const userData = JSON.parse(getLocalStorage('userData') || '{}')

// 上传文件 businesskey: 1001用户头像 1002身份证 1003房产证
const uploadFile = (param: { businesskey: number; file: any }) => {
  const formData = new FormData()
  formData.append('multipartFile', param.file)
  request(`/entrance/file/fileUpload?businesskey=${param.businesskey}`, {
    method: 'post',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res)
}
// 删除文件
const deleteFile = (param: { id: string }) =>
  request(`/file/file/deleteFile/${param.id}`)

// 获取所有机构
const getAllOrgList = () =>
  request(`/ucenter/org/getOrgList`, {
    noLoading: true
  })

// 获取当前登录用户机构下的所有年级
const getAllGradeList = () =>
  request(`/school/grade/getGradeList/${userData.orgId}`)

export { uploadFile, deleteFile, getAllOrgList, getAllGradeList }
