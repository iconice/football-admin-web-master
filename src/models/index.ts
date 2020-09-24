import HomeModel from './home'
import CommonModel from './common'
import LoginModal from './login'
import SystemManager from './system-manager'
import OrganizationManager from './organization-manager'
import BasicInfoManager from './basic-info-manager'
import SystemMonitor from './system-monitor'
import EntranceManager from './entrance-manager'

export default [
  HomeModel,
  ...CommonModel,
  LoginModal,
  ...SystemManager,
  ...OrganizationManager,
  ...BasicInfoManager,
  ...SystemMonitor,
  ...EntranceManager
]
