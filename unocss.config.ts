import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetAttributify
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetTypography()
  ]
})
