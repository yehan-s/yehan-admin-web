import { Icon3 } from '@/assets/icons/3'
import { IconBuguang } from '@/assets/icons/buguang'
import { IconFangdajing } from '@/assets/icons/fangdajing'
import { IconJiaretaiyang } from '@/assets/icons/jiaretaiyang'
import { IconShuyi_fanyi36 } from '@/assets/icons/shuyi_fanyi-36'
import { defaultSetting } from '@/default-setting'
import loginService from '@/pages/login/service'
import { useGlobalStore } from '@/stores/global'
import { useUserStore } from '@/stores/global/user'
import { i18n } from '@/utils/i18n'
import { BellOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Input, Dropdown, Button } from 'antd'
import { t } from 'i18next'
import { memo } from 'react'

const Header = () => {
  const { darkMode, collapsed, setCollapsed, setDarkMode, setLang, lang } = useGlobalStore()

  const { currentUser } = useUserStore()

  const { runAsync } = useRequest(loginService.logout, { manual: true })

  const logout = async () => {
    const [error] = await runAsync()
    if (error) return

    useGlobalStore.setState({
      token: '',
      refreshToken: '',
    })
  }

  return (
    <div
      style={{ zIndex: 998 }}
      className="color-t h-[80px] flex basis-[48px] items-center px-0 gap-[16px] fixed top-0 right-0 left-0 bg-primary"
    >
      <div className="flex items-center gap-[4px] text-[20px] px-[24px] pr-0">
        <IconBuguang className="text-blue-500" />
        <h1 className="text-primary font-bold text-[22px]">yehan-admin</h1>
      </div>
      <div
        className="btn-icon"
        onClick={() => {
          setCollapsed(!collapsed)
        }}
      >
        <MenuOutlined />
      </div>
      <div className="flex items-center justify-between flex-1 pr-[24px]">
        <Input
          style={{
            borderRadius: 8,
            outline: 'none',
            boxShadow: 'none',
          }}
          className="w-[400px] h-[50px] focus:(border-[rgb(135,94,196)]) <lg:hidden"
          size="large"
          prefix={
            <IconFangdajing
              style={{
                color: '#697586',
                paddingRight: 8,
              }}
            />
          }
          placeholder="搜索菜单"
          allowClear
        />
        <div className="pl-[20px] lg:hidden">
          <div
            className="btn-icon"
            onClick={() => {
              setCollapsed(!collapsed)
            }}
          >
            <MenuOutlined />
          </div>
        </div>
        <div className="flex gap-[16px] items-center">
          <div
            onClick={() => {
              setDarkMode(!darkMode)
            }}
            className="btn-icon text-[20px]"
          >
            {darkMode ? <IconJiaretaiyang /> : <Icon3 />}
          </div>
          <Dropdown
            menu={{
              items: defaultSetting.languages.map((language) => ({
                label: `${t(language.name)} (${language.key.toUpperCase()})`,
                key: language.key,
              })),
              onClick: async ({ key }) => {
                await i18n.changeLanguage(key)
                setLang(key)
              },
            }}
            trigger={['click']}
            placement="bottom"
            overlayClassName="w-[160px]"
          >
            <div className="btn-icon text-[20px] bg-[rgb(227,242,253)] dark:text-[rgb(30,136,229)] text-[rgb(30,136,229)] hover:(bg-[rgb(33,150,243)] dark:text-[rgb(227,242,253)] text-[rgb(227,242,253)])">
              {lang === 'zh' ? <IconShuyi_fanyi36 /> : <span className="text-[14px]">{lang.toUpperCase()}</span>}
            </div>
          </Dropdown>
          <div className="btn-icon">
            <BellOutlined />
          </div>
          <Dropdown
            trigger={['click']}
            placement="bottomLeft"
            getPopupContainer={(node) => node.parentElement!}
            dropdownRender={() => {
              return (
                <div
                  style={{
                    boxShadow: darkMode
                      ? 'rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px'
                      : 'rgba(0, 0, 0, 0.08) 0px 6px 30px',
                  }}
                  className="dark:bg-[rgb(33,41,70)] bg-white rounded-lg w-[200px]"
                >
                  <div className="p-[16px]">
                    <p className="text-[16px] dark:text-[rgb(237,242,247)] text-[rgb(17,25,39)] ">
                      {currentUser?.nickName}
                    </p>
                    <p className="text-[rgb(108,115,127)] dark:text-[rgb(160,174,192)] mt-[10px]">
                      {currentUser?.phoneNumber}
                    </p>
                    <p className="text-[rgb(108,115,127)] dark:text-[rgb(160,174,192)] mt-[0px]">
                      {currentUser?.email}
                    </p>
                  </div>
                  <hr
                    style={{ borderWidth: '0 0 thin' }}
                    className="m-[0] border-solid dark:border-[rgb(45,55,72)] border-[rgb(242,244,247)]"
                  />
                  <div className="p-[16px] text-center">
                    <Button onClick={logout} type="text" size="small">
                      退出登录
                    </Button>
                  </div>
                </div>
              )
            }}
          >
            <div className="btn-icon rounded-[27px] pl-[10px] pr-[14px] justify-between h-[48px] w-[92px] text-[20px] bg-[rgb(227,242,253)] text-[rgb(30,136,229)] hover:(bg-[rgb(33,150,243)] text-[rgb(227,242,253)])">
              <SettingOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
