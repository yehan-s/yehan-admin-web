import { useGlobalStore } from '@/stores/global'
import Content from './content'
import Header from './header'
import './index.css'
import Slide from './slide'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { antdUtils } from '@/utils/antd'
import { App } from 'antd'
import { useRequest } from '@/hook/use-request'
import userService from '@/pages/user/service'
import { toLoginPage } from '@/router'
import { useUserStore } from '@/stores/global/user'
import GlobalLoading from '@/components/global-loading'

const BasicLayout: React.FC = () => {
  const { lang, token, refreshToken } = useGlobalStore()
  const { setCurrentUser } = useUserStore()

  const navigate = useNavigate()

  const { loading, data: currentUserDetail, run: getUserInfo } = useRequest(userService.getUserInfo, { manual: true })

  const { message, notification, modal } = App.useApp()

  useEffect(() => {
    antdUtils.setMessageInstance(message)
    antdUtils.setNotificationInstance(notification)
    antdUtils.setModalInstance(modal)
  }, [message, notification, modal])

  // 检查token以及刷新token
  useEffect(() => {
    if (!token) {
      toLoginPage()
    }
  }, [token, navigate])
  useEffect(() => {
    if (!refreshToken) {
      toLoginPage()
      return
    }
    getUserInfo()
  }, [refreshToken, getUserInfo, navigate])
  // 设置当前用户信息
  useEffect(() => {
    setCurrentUser(currentUserDetail || null)
  }, [currentUserDetail, setCurrentUser])
  // 监听localStorage变化，同步到store（退出登录时清空token会触发）
  useEffect(() => {
    const storageChange = (e: StorageEvent) => {
      if (e.key === useGlobalStore.persist.getOptions().name) {
        useGlobalStore.persist.rehydrate()
      }
    }
    window.addEventListener<'storage'>('storage', storageChange)
    return () => {
      window.removeEventListener('storage', storageChange)
    }
  }, [])

  if (loading) {
    return <GlobalLoading />
  }

  return (
    <div key={lang} className="bg-primary overflow-hidden">
      <Header />
      <Slide />
      <Content></Content>
    </div>
  )
}

export default BasicLayout
