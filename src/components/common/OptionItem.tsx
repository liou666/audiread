import { type ParentComponent } from 'solid-js'
import { Show } from 'solid-js'

export interface Props {
  title: string
  nested?: boolean | number
  div?: boolean
  description?: string
}

const OptionItem: ParentComponent<Omit<Props, 'div'>> = (props) => {
  const { children, title, nested, description } = props
  return (
    <>
      <div class='flex gap-1 items-center'>
        {
        nested
          && (<div
            class='opacity-45 i-ri-corner-down-right-line'
            style={{ 'margin-left': typeof nested === 'number' ? `${nested * 0.5 + 0.5}rem` : '0.25rem' }}
              />)
      }
        <div class='text-sm opacity-75'>{title}</div>
      </div>
      <>
        {children}
      </>
    </>
  )
}

const OptionItemContainer: ParentComponent<Props> = (props) => {
  const { div, ...rest } = props
  return (
    <Show
      when={div}
      fallback={
        <label class='flex flex-col gap-2 select-none'>
          <OptionItem {...rest} />
        </label>
      }
    >
      <div class='flex flex-col gap-2 select-none'>
        <OptionItem {...rest} />
      </div>
    </Show>
  )
}

export default OptionItemContainer
