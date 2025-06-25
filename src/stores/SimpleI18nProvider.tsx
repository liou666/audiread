import { createContext, useContext, type JSX, type Accessor, onMount, onCleanup } from 'solid-js'
import { createSignal } from 'solid-js'
import { type Language, t as translate } from '../i18n/translations'

type I18nContextType = {
  language: Accessor<Language>
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType>()

export function SimpleI18nProvider(props: { children: JSX.Element; defaultLanguage?: Language }) {
  const [language, setLanguage] = createSignal<Language>(props.defaultLanguage || 'zh')
  
  // 保存到localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('audiread-language', lang)
    }
  }

  // 从localStorage读取初始语言
  onMount(() => {
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('audiread-language') as Language
      if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
        setLanguage(savedLang)
      }
    }

    // 监听外部语言变化事件
    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setLanguage(event.detail)
    }

    window.addEventListener('language-changed', handleLanguageChange as EventListener)

    onCleanup(() => {
      window.removeEventListener('language-changed', handleLanguageChange as EventListener)
    })
  })
  
  const t = (key: string): string => {
    return translate(language(), key)
  }

  const contextValue: I18nContextType = {
    language,
    setLanguage: handleSetLanguage,
    t
  }

  return (
    <I18nContext.Provider value={contextValue}>
      {props.children}
    </I18nContext.Provider>
  )
}

export function useSimpleI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useSimpleI18n must be used within a SimpleI18nProvider')
  }
  return context
}

export function useSimpleTranslation() {
  const { t } = useSimpleI18n()
  return t
} 
