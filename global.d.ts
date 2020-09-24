declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

/**
 * 全局状态
 */
interface IStore {
  loading: {
    effects: string[]
  }
  // common: ICommonStore
  // home: IHomeStore
  // find: IFindStore
}

/**
 * dva异步方法调用
 */
type IDispatch = (object: {
  type: string
  payload?: object
  callback?: (res: any) => void
}) => void
