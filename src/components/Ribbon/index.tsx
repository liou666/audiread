import Setting from './Setting'
import SoundSynthetic from './SoundSynthetic'
import { GlobalStateProvider, TTSConfigProvider } from '@/stores'

const Ribbon = () => {
  return (
    <GlobalStateProvider>
      <TTSConfigProvider>
        <div class='flex gap-4 h-full md:flex-row flex-col'>
          <SoundSynthetic />
          <Setting />
        </div>
      </TTSConfigProvider>
    </GlobalStateProvider>
  )
}

export default Ribbon
