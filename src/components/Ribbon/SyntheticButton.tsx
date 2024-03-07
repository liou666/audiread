import cx from 'classnames'
import { useGlobalState, useTTSConfig } from '@/stores'

import { synthesis } from '@/core/index'

const SyntheticButton = () => {
  const [ttsConfig] = useTTSConfig()
  const [globalState, { setGlobalState }] = useGlobalState()

  async function startSynthetic() {
    if (!globalState().preText.trim())
      return alert('请输入要合成的文本')

    setGlobalState({ ...globalState(), isSynthetic: true })

    try {
      const { url } = await synthesis({
        text: globalState().preText.trim(),
        lang: ttsConfig().language,
        voice: ttsConfig().voiceName,
        voiceStyle: ttsConfig().voiceStyle,
        rate: ttsConfig().rate,
        pitch: ttsConfig().pitch,
        volume: ttsConfig().volume,
      })
      setGlobalState({ ...globalState(), audioUrl: url, isSynthetic: false })
    }
    catch (error) {
      setGlobalState({ ...globalState(), audioUrl: '', isSynthetic: false })
      return alert('合成失败，请重试')
    }
  }

  return (
    <button
      disabled={globalState().isSynthetic} onClick={() => startSynthetic()}
      class={cx('btn-light gap-3 rounded-full', globalState().isSynthetic ? 'bg-active' : '')}
    >
      {globalState().isSynthetic ? <i class='i-eos-icons-loading icon-btn' /> : <i class='i-material-symbols-magic-button icon-btn' />}
      {globalState().isSynthetic ? '合成中...' : '合成音频'}
    </button>
  )
}

export default SyntheticButton
