import type { Component } from 'solid-js'
import { onMount } from 'solid-js'
import cx from 'classnames'
import { useDark } from '@/hooks'

interface Props {
  class?: string
}
const ToggleDarkMode: Component<Props> = (props) => {
  const { class: className } = props
  const [isDark, setIsDark] = useDark()

  const setMetaThemeColor = () => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', 'var(--c-bg-page)')
  }

  onMount(() => {
    setMetaThemeColor()
  })

  const toggleDark = () => {
    const dark = !isDark()
    setMetaThemeColor()
    setIsDark(dark)
  }

  return (
    <i
      onClick={toggleDark}
      class={cx('i-ic-sharp-dark-mode icon-btn dark:i-ic-round-wb-sunny', className)}
    />
  )
}

export default ToggleDarkMode
