// layout公共数据
import { EffectsCommandMap } from 'dva-core'
import { getLocalStorage } from '@/utils/storage'
import { getUserPermission } from '@/services/system-manager'
import { cycleArr } from '@/utils/tools'
import { rightCode } from '@/utils/request/errorHandle'

const menuName = getLocalStorage('menuName') || ''
const namespace = 'layout'
export { namespace }
export default {
  namespace,
  state: {
    menuName, // 默认打开一个tab、第一个页面
    siderData: [] // 菜单栏
  },
  effects: {
    *getUserPermission(
      { payload }: { payload: any },
      { call, put }: EffectsCommandMap
    ) {
      try {
        const { code, data } = yield call(getUserPermission, { ...payload })
        if (code !== rightCode) return
        const baseArr = data.filter((it: any) => it.parentId === '0')
        const restArr = data.filter((it: any) => it.parentId !== '0')
        cycleArr(baseArr, restArr)
        yield put({
          type: 'setState',
          payload: {
            siderData: baseArr
          }
        })
      } catch (e) {}
    }
  },
  reducers: {
    setState(state: any, { payload }: { payload: any }) {
      return { ...state, ...payload }
    }
  }
}
