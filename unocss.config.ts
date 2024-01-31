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
        primary: '#000000',
        secondary: '#767676',
        white: '#ffffff',
        semantic: {
          error: '#EC0000',
          success: '#669211'
        }
      },
      border: {
        primary: '#000000',
        semantic: {
          error: '#EC0000'
        }
      },
      surface: {
        primary: '#ffffff',
        success: '#669211',
        error: '#EC0000'
      },
      brand: {
        cyan: '#4fe5c6',
        violet: '#3d1192',
        yellow: '#fee03c',
        orange: '#fa9d32'
      }
    },
    fontSize: {
      h2: [
        '2rem',
        {
          'font-weight': '700'
        }
      ],
      body: ['1rem', 1.7],
      caption: [
        '0.875rem',
        {
          'line-height': '1.5',
          'font-weight': '400'
        }
      ],
      label: [
        '1rem',
        {
          'line-height': '1.5',
          'font-weight': '500'
        }
      ],
      button: [
        '1.25rem',
        {
          'line-height': '1.5',
          'font-weight': '700'
        }
      ]
    }
  },
  rules: [
    [
      /^text-shadow-(\d+)$/,
      ([, d]) => ({
        'text-shadow': `0 ${d}px 0px #000000`
      })
    ],
    [
      'bg-check',
      {
        background: `conic-gradient(
            #ddd 90deg,
            transparent 90deg 180deg,
            #ddd 180deg 270deg,
            transparent 270deg
          ) 50% 50% / 16px 16px, #fff`
      }
    ]
  ],
  transformers: [transformerVariantGroup()]
})
