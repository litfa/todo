import { TinyColor } from '@ctrl/tinycolor'
import { useColorMode, useCssVar } from '@vueuse/core'
import { ref, watch } from 'vue'

type Theme = {
  light: {
    [key: string]: string
  }
  [name: string]: {
    [key: string]: string
  }
}

const pureColor = ['white', 'black']
const primaryColor = ['primary', 'success', 'warning', 'danger', 'error', 'info']
const textType = ['primary', 'regular', 'secondary', 'placeholder', 'disabled']
const vars = ['bg-color-page', 'bg-color', 'text-color']
const primaryColorLevel = 9

const setCssVars = (theme: { [key: string]: string }) => {
  /**
   * 纯色
   * 遍历不同等级的不透明度
   */
  pureColor.forEach((type) => {
    const color = new TinyColor(theme[type])
    useCssVar(`--${type}`).value = color.toHexString()
    let i = primaryColorLevel
    while (i--) {
      const level = primaryColorLevel - i
      useCssVar(`--${type}-opacity-${level}`).value = color.setAlpha(0.1 * level).toHex8String()
    }
  })
  /**
   * 主题色
   * 遍历出不同亮度等级
   */
  primaryColor.forEach((type) => {
    const color = new TinyColor(theme[type])
    useCssVar(`--${type}`).value = color.toHexString()
    let level = primaryColorLevel
    while (level--) {
      useCssVar(`--${type}-light-${level}`).value = color.lighten(5 * level).toHexString()
    }
  })
  /**
   * 文字颜色
   * 不同等级的文字
   */
  textType.forEach((type, i) => {
    const color = new TinyColor(theme['text-color'])
    useCssVar(`--text-color-${type}`).value = color.lighten((i + 1) * 17).toHexString()
  })
  /**
   * 其他变量
   * 原样复制
   */
  vars.forEach((e) => {
    useCssVar(`--${e}`).value = theme[e]
  })
}

// todo: 优化主题色调用和返回方式
export const useThemes = (themes: Theme) => {
  const mode = useColorMode()
  const theme = ref<{
    [key: string]: string
  }>({})
  watch(
    mode,
    (mode) => {
      if (mode == 'auto') {
        mode = 'light'
      }
      setCssVars(themes[mode])
      theme.value = themes[mode]
    },
    {
      immediate: true
    }
  )

  return { mode, theme }
}

/**
 * 用于生成 nuxt.config.ts 中的 less 编译器配置
 * @returns
 */
export const lessAdditionalData = () => {
  const result: string[] = []
  // 工具less
  result.push(`@import url('src/assets/utils.less');`)
  pureColor.forEach((e) => {
    result.push(`@${e}: var(--${e});`)
    let i = primaryColorLevel
    while (i--) {
      result.push(`@${e}-opacity-${i}: var(--${e}-opacity-${i});`)
    }
  })
  primaryColor.forEach((e) => {
    result.push(`@${e}: var(--${e});`)
    let i = primaryColorLevel
    while (i--) {
      result.push(`@${e}-${i}: var(--${e}-${i});`)
    }
  })
  textType.forEach((e) => {
    result.push(`@text-color-${e}: var(--text-color-${e});`)
  })
  vars.forEach((e) => {
    result.push(`@${e}: var(--${e});`)
  })
  return result.join('')
}
