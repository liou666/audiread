import { useGlobalState, useTTSConfig } from '@/stores'
import { getLabelName } from '@/core/config'

const SoundSynthetic = () => {
  const [globalState, { setGlobalState }] = useGlobalState()
  const [ttsConfig] = useTTSConfig()

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
            class='border border-base h-full w-full p-16 resize-none rounded flex flex-col gap-8 items-center justify-center'
          >
            {/* <div class='text-8xl'>🥳</div> */}
            <div class='text-3xl'><img src='/2.png' alt='' /></div>
            <h2>文本合成语音文件成功!</h2>
            <audio
              src={globalState().audioUrl}
              controls
              autoplay
              class='w-full'
            />
            <div class='flex gap-2'>
              <button onClick={() => setGlobalState({ ...globalState(), audioUrl: '' })} class='btn rounded-full px-8'>返回</button>
              <button onClick={() => { download(globalState().audioUrl, fileName()) }} class='btn rounded-full px-8'>下载音频</button>
            </div>
          </div>
          )
        : <textarea
            value={globalState().preText}
            onInput={({ target: { value } }) => setGlobalState({ ...globalState(), preText: value })}
            class='base-textarea text-lg h-full w-full p-4 resize-none rounded'
            placeholder='输入要合成的文本'
          />
    }

    </div>
  )
}

export default SoundSynthetic
