import { type Component } from 'solid-js'
import cx from 'classnames'
import { Gender } from '@/core/types'
import type { EdgeVoice } from '@/core/types'
import { getLabelName } from '@/core/config'
import { synthesis } from '@/core/index'

const previewText = '你好，今天天气怎么样？。hello, what‘s up guys。'

interface Props {
  roleInfo: EdgeVoice
  selected: boolean
  onClick: (shortname: string) => void
}

const RoleCard: Component<Props> = (props) => {
  function preview() {
    synthesis({
      text: previewText,
      voice: props.roleInfo.ShortName,
    }, true)
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
        }} class='btn rounded-full ml-auto'
      >
        <i class={cx('i-ic-music-note', props.selected ? '' : 'opacity-75')} />
        试听音色
      </button>
    </div>
  )
}

export default RoleCard
