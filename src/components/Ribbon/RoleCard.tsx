import { type Component } from 'solid-js'
import cx from 'classnames'
import { Gender } from '@/core/types'
import type { EdgeVoice } from '@/core/types'
import { getLabelName } from '@/core/config'
import { synthesis } from '@/core/index'
import { useSimpleTranslation } from '@/stores/SimpleI18nProvider'
import { useGlobalState } from '@/stores'

interface Props {
  roleInfo: EdgeVoice
  selected: boolean
  onClick: (shortname: string) => void
}

const RoleCard: Component<Props> = (props) => {
  const t = useSimpleTranslation()
  const [globalState, { setGlobalState }] = useGlobalState()
  
  const isCurrentlyPreviewing = () => globalState().currentPreviewVoice === props.roleInfo.ShortName
  const isLoading = () => isCurrentlyPreviewing() && globalState().isPreviewLoading
  
  async function preview() {
    // 如果当前有正在预览的语音，先停止
    if (globalState().currentPreviewStop) {
      globalState().currentPreviewStop?.()
    }
    
    // 设置当前预览状态
    setGlobalState({
      ...globalState(),
      currentPreviewVoice: props.roleInfo.ShortName,
      isPreviewLoading: true,
      currentPreviewStop: null
    })
    
    try {
      const resetPreviewState = () => {
        // 只有当前仍然是这个语音在预览时才重置
        if (globalState().currentPreviewVoice === props.roleInfo.ShortName) {
          setGlobalState({
            ...globalState(),
            currentPreviewVoice: null,
            isPreviewLoading: false,
            currentPreviewStop: null
          })
        }
      }
      
      const { stopSpeak } = await synthesis({
        text: t('ui.previewText'),
        voice: props.roleInfo.ShortName,
        onFinish: resetPreviewState
      }, true)
      
      // 更新停止函数和取消加载状态
      setGlobalState({
        ...globalState(),
        isPreviewLoading: false,
        currentPreviewStop: () => {
          stopSpeak()
          resetPreviewState()
        }
      })
      
    } catch (error) {
      // 预览失败，重置状态
      setGlobalState({
        ...globalState(),
        currentPreviewVoice: null,
        isPreviewLoading: false,
        currentPreviewStop: null
      })
    }
  }
  return (
    <div onClick={() => props.onClick(props.roleInfo.ShortName)} class={cx('rounded border border-base px-3 py-2 text-sm', props.selected ? 'bg-active' : '')}>
      <div class='flex gap-3 items-center'>
        <div class={cx('rounded-full w-6 h-6', props.roleInfo.Gender === Gender.Female ? 'bg-pink-300' : 'bg-gray-300') } />
        <div class={cx(props.selected ? '' : 'opacity-75')}>{getLabelName(props.roleInfo.ShortName)}</div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          preview()
        }} 
        disabled={isLoading()}
        class={cx('btn rounded-full ml-auto', isLoading() ? 'opacity-50 cursor-not-allowed' : '')}
      >
        {isLoading() 
          ? <i class='i-eos-icons-loading' />
          : <i class={cx('i-ic-music-note', props.selected ? '' : 'opacity-75')} />
        }
        {isLoading() ? t('common.synthesizing') : t('common.preview')}
      </button>
    </div>
  )
}

export default RoleCard
