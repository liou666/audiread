import { createSignal, onMount } from 'solid-js'
import { For } from 'solid-js'
import { languageNames, type Language } from '@/i18n/translations'

const languages: Language[] = ['zh', 'en']

const StandaloneLanguageToggle = () => {
  const [language, setLanguage] = createSignal<Language>('zh')

  // 初始化时从localStorage读取语言设置
  onMount(() => {
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('audiread-language') as Language
      if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
        setLanguage(savedLang)
      }
    }
  })

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('audiread-language', newLang)
    }
    // 触发一个自定义事件来通知其他组件语言发生了变化
    window.dispatchEvent(new CustomEvent('language-changed', { detail: newLang }))
  }

  return (
    <select
      value={language()}
      onChange={({ target: { value } }) => handleLanguageChange(value as Language)}
      class="base-input w-24 !px-1"
    >
      <For each={languages}>
        {(lang) => (
          <option value={lang}>
            {languageNames[lang]}
          </option>
        )}
      </For>
    </select>
  )
}

export default StandaloneLanguageToggle 
