import type { Component } from 'solid-js'
import { splitProps } from 'solid-js'

export interface Props {
  max: number
  min: number
  step: number
  unit?: string
  default?: number
  value: number
  onChange: (value: string) => void
}

const OptionSlider: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['unit', 'default', 'onChange'])
  return (
    <div class='flex gap-2 items-center w-full'>
      <div class='relative h-[22px] flex-auto'>
        <input
          {...others} type='range'
          onChange={({ target: { value } }) => local.onChange(value)}
          class='slider absolute bottom-0 left-0 right-0 top-0 z-10 w-full align-top rounded overflow-hidden border-base border bg-secondary'
        />
        {local.default && <span class='absolute bottom-0 top-0 h-full w-1px border-base border-r opacity-75' style={{ left: `${((local.default - props.min) / (props.max - props.min)) * 100}%` }} />}
      </div>
      <div class='relative h-[22px]'>
        <input
          value={props.value} type='number'
          onChange={({ target: { value } }) => local.onChange(value)}
          class='rounded m-0 bg-secondary pl-2 align-top text-sm border border-base'
        />
        {local.unit && <span class='pointer-events-none absolute right-1 top-0.5 text-xs opacity-25'>{local.unit}</span>}
      </div>
    </div>
  )
}

export default OptionSlider
