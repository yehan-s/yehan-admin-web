import { t } from '@/utils/i18n'
import { useRequest } from 'ahooks'
import loginService, { LoginDTO } from './service'
import { useGlobalStore } from '@/stores/global'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { JSEncrypt } from 'jsencrypt'
import { Button, Carousel, Form, Input, message } from 'antd'
import { IconBuguang } from '@/assets/icons/buguang'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { IconYanzhengma } from '@/assets/icons/yanzhengma'

const Login = () => {
  const navigate = useNavigate()
  const { setToken, setRefreshToken } = useGlobalStore()
  const { data: captcha, refresh: refreshCaptcha } = useRequest(loginService.getCaptcha)
  const { runAsync: login, loading } = useRequest(loginService.login, { manual: true })
  const { runAsync: getPublicKey } = useRequest(loginService.getPublicKey, { manual: true })

  const onFinish = async (values: LoginDTO) => {
    if (!captcha?.data) {
      console.log('没有生成验证码')
      return
    }

    // 获取公钥
    const { data: publicKey } = await getPublicKey()

    // 使用公钥对密码进行加密
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    const password = encrypt.encrypt(values.password)

    if (!password) {
      console.log('密码加密失败')
      return
    }
    values.password = password
    values.publicKey = publicKey

    try {
      const { data } = await login(values)
      setToken(data.token)
      setRefreshToken(data.refreshToken)
      navigate('/')
    } catch (error: any) {
      message.error(
        error.response?.data?.messages ? error.response?.data?.messages.message[0] : error.response.data.message
      )
    }
  }

  return (
    <div className="bg-primary light:bg-[rgb(238,242,246)] bg-[rgb(238,242,246)] flex justify-center items-center h-[100vh]">
      <div className="flex-[2.5] flex justify-center">
        <div className="dark:bg-[rgb(33,41,70)] w-[400px] px-[32px] py-[20px] mt-[-12%] bg-white rounded-lg <lg:(w-[94%] mx-auto)">
          <div className="text-center">
            <div className="flex justify-center gap-2">
              <IconBuguang className="text-[20px] text-blue-500"></IconBuguang>
              <h1 className="dark:text-white" style={{ marginBottom: '0.2em' }}>
                yehan-admin
              </h1>
            </div>
            <h3 className="dark:text-white text-[rgba(0,0,0,.45)] mb-[1em] text-[14px] font-normal">
              {t('njiWdfln' /* 一个高颜值后台管理系统 */)}
            </h3>
            <Form
              name="super-admin"
              className="login-form"
              initialValues={{ accountNumber: 'admin', password: '123456' }}
              onFinish={onFinish}
              size="large"
            >
              <Form.Item name="accountNumber" rules={[{ required: true, message: t('cchoZjrx' /* 请输入账号 */) }]}>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  className="site-form-item-icon"
                  placeholder={t('GwXcwdiZ' /* 账号 */)}
                  size="large"
                ></Input>
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: t('fVXfZHlo' /* 请输入密码 */) }]}>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={t('XDzlCnIb' /* 密码 */)}
                ></Input>
              </Form.Item>
              <Form.Item name="captcha" rules={[{ required: true, message: t('gslFxUtM' /* 请输入验证码 */) }]}>
                <Input
                  prefix={<IconYanzhengma className="text-[20px] " />}
                  placeholder={t('IqifvViI' /* 验证码 */)}
                  suffix={
                    <div
                      className="cursor-pointer "
                      dangerouslySetInnerHTML={{ __html: captcha?.data.data as string }}
                      onClick={refreshCaptcha}
                    />
                  }
                ></Input>
              </Form.Item>
              <Form.Item style={{ marginBottom: 18 }}>
                <Button type="primary" loading={loading} block htmlType="submit">
                  {t('bkBMlMCT' /* 登录 */)}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div
        className="flex-[1.7] dark:bg-[rgb(33,41,70)] bg-white h-[100vh] relative <lg:hidden"
        style={{
          backgroundImage: 'url(/images/login-right-bg.svg)',
        }}
      >
        <div
          className="img1 w-[243px] h-[210px] bg-center absolute top-[23%] left-[37%]"
          style={{
            backgroundSize: 380,
            backgroundImage: 'url(/images/login-right-before.svg)',
          }}
        />
        <div
          className="img2 w-[313px] h-[280px] bg-center absolute top-[32%] left-[40%]"
          style={{
            backgroundSize: 380,
            backgroundImage: 'url(/images/login-right-after.svg)',
          }}
        />
        <div className="absolute left-[100px] right-[100px] bottom-[50px] h-[200px]">
          <Carousel autoplay dots={{ className: 'custom' }}>
            <div>
              <div className="h-[160px] bg-transparent flex items-center justify-center">
                <div>
                  <h3 className="dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]">yehan-admin</h3>
                  <div className="dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px] ">
                    {t('kXfYuEnp' /* 一个高颜值后台管理系统 */)}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="h-[160px] bg-transparent flex items-center justify-center">
                <div>
                  <h3 className="dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]">yehan-admin</h3>
                  <div className="dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px]">
                    {t('bjuRXLpI' /* 一个高颜值后台管理系统 */)}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="h-[160px] bg-transparent flex items-center justify-center">
                <div>
                  <h3 className="dark:text-[rgb(215,220,236)] text-[rgb(18,25,38)] text-[34px]">yehan-admin</h3>
                  <div className="dark:text-[rgb(132,146,196)] text-[rgb(105,117,134)] text-[12px] my-[20px] ">
                    {t('fARyoAJV' /* 一个高颜值后台管理系统 */)}
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Login
