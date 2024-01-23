import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetAttributify
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetTypography()
  ],
  theme: {
    colors: {
      text: {
        primary: '#ffffff'
      },
      brand: {
        cyan: '#4fe5c6',
        violet: '#3d1192',
        yellow: '#fee03c',
        orange: '#fa9d32'
      }
    },
    fontSize: {
      body: ['1rem'],
      button: ['1.25rem', '1.5']
    }
  },
  rules: [
    [/^text-shadow-(\d+)$/, ([, d]) => ({
      'text-shadow': `0 ${d}px 0px #000000`
    })]
  ],
  transformers: [
    transformerVariantGroup()
  ]
})
