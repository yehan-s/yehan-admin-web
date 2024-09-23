import i18n from 'i18next'
import enUS from '@/assets/locales/en_US'
import zhCN from '@/assets/locales/zh_CN'
import { defaultSetting } from '@/default-setting'

i18n
  // 初始化 i18next
  // 配置参数的文档: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        translation: enUS,
      },
      zh: {
        translation: zhCN,
      },
    },
    debug: true,
    lng: defaultSetting.defaultLang || 'zh', //默认语言
    fallbackLng: defaultSetting.defaultLang || 'en', //后备语言
    interpolation: {
      escapeValue: false,
    },
  })

export const t = (key: string) => {
  return i18n.t(key) || key
}

export { i18n }
