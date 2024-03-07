import { createContext, createSignal, useContext } from 'solid-js'
import type { Accessor, ParentComponent, Setter } from 'solid-js'

import type { TTSConfig } from '@/types'

export type TTSConfigContextType = [
  Accessor<TTSConfig>,
  {
    resetTTSConfig: () => void
    setTTSConfig: Setter<TTSConfig>
  },

]

const TTSConfigContext = createContext<TTSConfigContextType>()

export const defaultTTSData: TTSConfig = {
  language: 'zh-CN',
  voiceName: 'zh-CN-XiaoxiaoNeural',
  voiceStyle: 'Friendly',
  rate: 1,
  volume: 0, // 百分比
  pitch: 0,
}

export const TTSConfigProvider: ParentComponent = (props) => {
  const [ttsConfig, setTTSConfig] = createSignal<TTSConfig>(defaultTTSData)
  const store: TTSConfigContextType = [ttsConfig,
    {
      resetTTSConfig() {
        setTTSConfig(defaultTTSData)
      },
      setTTSConfig,
    },
  ]
  return (
    <TTSConfigContext.Provider value={store}>
      {props.children}
    </TTSConfigContext.Provider>
  )
}

export function useTTSConfig() { return useContext(TTSConfigContext)! }
