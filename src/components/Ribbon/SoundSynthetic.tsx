import { useGlobalState, useTTSConfig } from '@/stores'
import { useSimpleTranslation } from '@/stores/SimpleI18nProvider'
import { getLabelName } from '@/core/config'

const SoundSynthetic = () => {
  const [globalState, { setGlobalState }] = useGlobalState()
  const [ttsConfig] = useTTSConfig()
  const t = useSimpleTranslation()

  function download(url: string, name = 'audio.mp3') {
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
  }

  const fileName = () => `${getLabelName(ttsConfig().voiceName)}-${ttsConfig().language}-${+new Date()}.mp3`

  return (
    <div class='flex-1'>
      {globalState().audioUrl
        ? (
          <div
            class='border border-base h-full w-full md:p-16 p-8 resize-none rounded flex flex-col gap-8 items-center justify-center'
          >
            {/* <div class='text-8xl'>🥳</div> */}
            <div class='text-3xl'><img src='/2.png' alt='' /></div>
            <h2>{t('ui.successMessage')}</h2>
            <audio
              src={globalState().audioUrl}
              controls
              autoplay
              class='w-full'
            />
            <div class='flex gap-2'>
              <button onClick={() => setGlobalState({ ...globalState(), audioUrl: '' })} class='btn rounded-full px-8'>{t('common.back')}</button>
              <button onClick={() => { download(globalState().audioUrl, fileName()) }} class='btn rounded-full px-8'>{t('common.download')}</button>
            </div>
          </div>
          )
        : <textarea
            value={globalState().preText}
            onInput={({ target: { value } }) => setGlobalState({ ...globalState(), preText: value })}
            class='base-textarea text-lg h-full w-full p-4 resize-none rounded min-h-80'
            placeholder={t('ui.textPlaceholder')}
          />
    }

    </div>
  )
}

export default SoundSynthetic
