import Setting from './Setting'
import SoundSynthetic from './SoundSynthetic'
import { GlobalStateProvider, TTSConfigProvider, SimpleI18nProvider } from '@/stores'

const Ribbon = () => {
  return (
    <SimpleI18nProvider>
      <GlobalStateProvider>
        <TTSConfigProvider>
          <div class='flex gap-4 h-full md:flex-row flex-col'>
            <SoundSynthetic />
            <Setting />
          </div>
        </TTSConfigProvider>
      </GlobalStateProvider>
    </SimpleI18nProvider>
  )
}

export default Ribbon
