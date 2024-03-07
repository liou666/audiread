import { useTTSConfig } from '@/stores'

import { synthesis } from '@/core/index'

const previewText = '你好，今天天气怎么样？。hello, what‘s up guys。'

export function usePreviewVoice(text = previewText) {
  const [ttsConfig] = useTTSConfig()
  synthesis({
    text,
    lang: ttsConfig().language,
    voice: ttsConfig().voiceName,
    voiceStyle: ttsConfig().voiceStyle,
    rate: ttsConfig().rate,
    pitch: ttsConfig().pitch,
    volume: ttsConfig().volume,
  }, true)
}
