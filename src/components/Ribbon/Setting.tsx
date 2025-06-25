import { For, createEffect, createSignal, onMount } from 'solid-js'

import RoleCard from './RoleCard'
import SyntheticButton from './SyntheticButton'
import { patchOptions, rateOptions, volumeOptions } from './ttsConfigOption'
import { useTTSConfig } from '@/stores'
import { useSimpleTranslation } from '@/stores/SimpleI18nProvider'
import OptionItem from '@/components/common/OptionItem'

import type { EdgeVoice } from '@/core/types'
import { getEdgeVoices } from '@/core/edge-tts'
import { supportLanguageMap } from '@/core/config'

const Setting = () => {
  const [allLangs, setAllLangs] = createSignal<string[]>([])
  const [langOrigins, setLangOrigins] = createSignal<EdgeVoice[]>([])

  const [ttsConfig, { setTTSConfig }] = useTTSConfig()
  const t = useSimpleTranslation()

  // 获取语言名称的函数，优先使用翻译，回退到原有的 supportLanguageMap
  const getLanguageName = (lang: string) => {
    // 先尝试从翻译中获取
    const translatedName = t(`languages.${lang}`)
    if (translatedName && translatedName !== `languages.${lang}`) {
      return translatedName
    }
    // 回退到原有的 supportLanguageMap
    return supportLanguageMap[lang] || lang
  }

  onMount(async () => {
    const res = await getEdgeVoices()
    const langs = [...new Set(res.map(x => x.Locale))].filter(l => Object.keys(supportLanguageMap).includes(l))
    setLangOrigins(res)
    setAllLangs(langs)
  })

  const currentVoice = () => langOrigins().filter(x => x.Locale === ttsConfig().language)

  createEffect((pre) => {
    if (pre !== ttsConfig().language && currentVoice()[0]?.ShortName)
      setTTSConfig({ ...ttsConfig(), voiceName: currentVoice()[0]?.ShortName })
    return ttsConfig().language
  }, '')

  return (
    <div class=' border p-4 rounded border-base flex flex-col gap-4 md:w-96 w-full'>
      <OptionItem title='language'>
        <select
          onChange={({ target: { value } }) => {
            setTTSConfig(pre => ({ ...pre, language: value }))
          }}
          class='base-input'
        >
          <For
            each={allLangs()}
          >
            {lang => (
              <option selected={ttsConfig().language === lang} value={lang}>{getLanguageName(lang)}</option>
            )}
          </For>
        </select>
      </OptionItem>
      <OptionItem div title='role'>
        <section class='flex flex-col gap-2 overflow-auto max-h-60'>
          <For
            each={currentVoice()}
          >
            {item => (
              <RoleCard
                onClick={value => setTTSConfig({ ...ttsConfig(), voiceName: value }) }
                selected={ttsConfig().voiceName === item.ShortName}
                roleInfo={item}
              />
            )}
          </For>
        </section>
      </OptionItem>
      <div class='border-b border-base h-1 mx-[-1rem]' />
      <OptionItem title='speed'>
        <select
          onChange={({ target: { value } }) => {
            setTTSConfig(pre => ({ ...pre, rate: Number(value) }))
          }}
          class='base-input'
        >
          <For
            each={rateOptions}
          >
            {rate => (
              <option
                selected={ttsConfig().rate === rate.value}
                value={rate.value}
              >
                {rate.value === 1.0 ? t('options.rate.default') : rate.label}
              </option>
            )}
          </For>
        </select>
      </OptionItem>
      <OptionItem title={'volume'}>
        <select
          onChange={({ target: { value } }) => {
            setTTSConfig(pre => ({ ...pre, volume: Number(value) }))
          }}
          class='base-input'
        >
          <For
            each={volumeOptions}
          >
            {volume => (
              <option
                selected={ttsConfig().volume === volume.value}
                value={volume.value}
              >
                {volume.value === 0 ? t('options.volume.default') : volume.label}
              </option>
            )}
          </For>
        </select>
      </OptionItem>
      <OptionItem title={'pitch'}>
        <select
          onChange={({ target: { value } }) => {
            setTTSConfig(pre => ({ ...pre, pitch: Number(value) }))
          }}
          class='base-input'
        >
          <For
            each={patchOptions}
          >
            {pitch => (
              <option
                selected={ttsConfig().pitch === pitch.value}
                value={pitch.value}
              >
                {pitch.value === 0 ? t('options.pitch.default') : pitch.label}
              </option>
            )}
          </For>
        </select>
      </OptionItem>
      <SyntheticButton />
    </div>
  )
}

export default Setting
