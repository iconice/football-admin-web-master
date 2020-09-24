// 保存数据
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, value)
}

// 获取数据
export function getLocalStorage(key: string) {
  return localStorage.getItem(key)
}

// 删除数据
export function removeLocalStorage(key: string) {
  return localStorage.removeItem(key)
}

// 清除所有localstorage
export function clearLocalStorage() {
  return localStorage.clear()
}

// 获取cookie数据
export function getCookie(name: string) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)

  if (arr && arr.length) {
    return unescape(arr[2])
  } else {
    return null
  }
}
