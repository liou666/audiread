import cx from 'classnames'
import { useGlobalState, useTTSConfig } from '@/stores'
import { useSimpleTranslation } from '@/stores/SimpleI18nProvider'

import { synthesis } from '@/core/index'

const SyntheticButton = () => {
  const [ttsConfig] = useTTSConfig()
  const [globalState, { setGlobalState }] = useGlobalState()
  const t = useSimpleTranslation()

  async function startSynthetic() {
    if (!globalState().preText.trim())
      return alert(t('alerts.enterText'))

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
      return alert(t('alerts.synthesisError'))
    }
  }

  return (
    <button
      disabled={globalState().isSynthetic} onClick={() => startSynthetic()}
      class={cx('btn-light gap-3 rounded-full', globalState().isSynthetic ? 'bg-active' : '')}
    >
      {globalState().isSynthetic ? <i class='i-eos-icons-loading icon-btn' /> : <i class='i-material-symbols-magic-button icon-btn' />}
      {globalState().isSynthetic ? t('common.synthesizing') : t('common.synthesize')}
    </button>
  )
}

export default SyntheticButton
