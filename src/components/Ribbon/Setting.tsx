import { For, createEffect, createSignal, onMount } from 'solid-js'

import RoleCard from './RoleCard'
import SyntheticButton from './SyntheticButton'
import { patchOptions, rateOptions, volumeOptions } from './ttsConfigOption'
import { useTTSConfig } from '@/stores'
import OptionItem from '@/components/common/OptionItem'

import type { EdgeVoice } from '@/core/types'
import { getEdgeVoices } from '@/core/edge-tts'
import { supportLanguageMap } from '@/core/config'

const Setting = () => {
  const [allLangs, setAllLangs] = createSignal<string[]>([])
  const [langOrigins, setLangOrigins] = createSignal<EdgeVoice[]>([])

  const [ttsConfig, { setTTSConfig }] = useTTSConfig()

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
      <OptionItem title='语言'>
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
              <option selected={ttsConfig().language === lang} value={lang}>{supportLanguageMap[lang]}</option>
            )}
          </For>
        </select>
      </OptionItem>
      <OptionItem div title='角色'>
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
      <OptionItem title='语速'>
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
                {rate.label}
              </option>
            )}
          </For>
        </select>
      </OptionItem>
      <OptionItem title='音量'>
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
                {volume.label}
              </option>
            )}
          </For>
        </select>
      </OptionItem>
      <OptionItem title='音调'>
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
                {pitch.label}
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
