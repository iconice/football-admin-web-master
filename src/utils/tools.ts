import Config from '@/config'
const { imgUrl } = Config

/** 浮点数运算精度问题封装
 * @param f 需要处理的数据
 * @param digit 精度
 */
export const formatFloat = (f: number, digit: number) => {
  // Math.pow(指数，幂指数)
  const m = Math.pow(10, digit)
  // Math.round（） 四舍五入
  return Math.round(f * m) / m
}

/**
 * 用户权限数组循环递归方法
 * @param baseArr 基本底层数组
 * @param restData 余下的数据
 */
export const cycleArr = (baseArr: any[], restData: any[]) => {
  // eslint-disable-next-line
  baseArr.map((item: any, index: number) => {
    const childArr = restData.filter((it: any) => it.parentId === item.id)
    if (childArr.length) {
      baseArr[index].children = childArr
    }
    const restArr = restData.filter((it: any) => it.parentId !== item.id)
    if (restArr.length && childArr.length) {
      cycleArr(childArr, restArr)
    }
  })
}

/**
 * 图片链接完整url拼接
 * @halfUrl 为接口返回的url
 */
export const completeUrl = (halfUrl: string): string => {
  if (!halfUrl) {
    return ''
  }
  if (halfUrl.indexOf('http') === 0 || halfUrl.indexOf('https') === 0) {
    return encodeURI(halfUrl)
  }
  return encodeURI(`${imgUrl}${halfUrl}`)
}
