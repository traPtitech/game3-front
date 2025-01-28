import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetAttributify,
  transformerDirectives,
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetTypography(),
  ],
  theme: {
    colors: {
      text: {
        primary: '#000000',
        secondary: '#767676',
        white: '#ffffff',
        link: '#0017C1',
        visited: '#000082',
        semantic: {
          error: '#EC0000',
          success: '#669211',
        },
      },
      border: {
        primary: '#000000',
        secondary: '#B9B9B9',
        semantic: {
          error: '#EC0000',
        },
      },
      surface: {
        primary: '#ffffff',
        success: '#669211',
        error: '#EC0000',
      },
      brand: {
        cyan: '#4fe5c6',
        violet: '#3d1192',
        yellow: '#fee03c',
        orange: '#fa9d32',
      },
    },
    fontSize: {
      'button': [
        '1.25rem',
        {
          'line-height': '1.5',
          'font-weight': '700',
        },
      ],
      'h-xxl': [
        '3.5rem',
        {
          'font-weight': '700',
          'line-height': '1.4',
        },
      ],
      'h-xl': [
        '3rem',
        {
          'font-weight': '700',
          'line-height': '1.4',
        },
      ],
      'h-l': [
        '2.25rem',
        {
          'font-weight': '700',
          'line-height': '1.4',
        },
      ],
      'h-l-m': [
        '2rem',
        {
          'font-weight': '700',
          'line-height': '1.5',
        },
      ],
      'h-m': [
        '2rem',
        {
          'font-weight': '700',
          'line-height': '1.5',
        },
      ],
      'h-m-m': [
        '1.75rem',
        {
          'font-weight': '700',
          'line-height': '1.5',
        },
      ],
      'h-s': [
        '1.75rem',
        {
          'font-weight': '700',
          'line-height': '1.5',
        },
      ],
      'h-s-m': [
        '1.5rem',
        {
          'font-weight': '700',
          'line-height': '1.5',
        },
      ],
      'h-xs': [
        '1.5rem',
        {
          'line-height': '1.5',
        },
      ],
      'h-xs-m': [
        '1.25rem',
        {
          'font-weight': '500',
          'line-height': '1.5',
        },
      ],
      'h-xxs': [
        '1.25rem',
        {
          'line-height': '1.5',
        },
      ],
      'h-xxs-m': [
        '1rem',
        {
          'font-weight': '500',
          'line-height': '1.7',
        },
      ],
      'body-l': [
        '1rem',
        {
          'line-height': '1.7',
        },
      ],
      'body-m': [
        '0.875rem',
        {
          'line-height': '1.7',
        },
      ],
      'label-l': [
        '1.125rem',
        {
          'font-weight': '500',
          'line-height': '1.5',
        },
      ],
      'label-m': [
        '1rem',
        {
          'font-weight': '500',
          'line-height': '1.5',
        },
      ],
      'caption-l': [
        '0.875rem',
        {
          'line-height': '1.7',
        },
      ],
      'caption-m': [
        '0.75rem',
        {
          'line-height': '1.7',
        },
      ],
    },
    fontFamily: {
      agency: '\'Agency FB\', sans-serif',
    },
  },
  shortcuts: {
    'h1-text': 'text-h-l-m md:text-h-l',
    'h2-text': 'text-h-m-m md:text-h-m',
    'h3-text': 'text-h-s-m md:text-h-s',
    'h4-text': 'text-h-xs-m md:text-h-xs',
    'h5-text': 'text-h-xxs-m md:text-h-xxs',
    'body': 'text-body-m md:text-body-l',
    'label': 'text-label-m md:text-label-l',
    'caption': 'text-caption-l md:text-caption-m',
    'link': 'text-text-link underline visited:text-text-visited hover:no-underline break-anywhere',
  },
  rules: [
    [
      /^text-shadow-(\d+)$/,
      ([, d]) => ({
        'text-shadow': `0 ${d}px 0px #000000`,
      }),
    ],
    [
      'bg-check',
      {
        background: `conic-gradient(
            #ddd 90deg,
            transparent 90deg 180deg,
            #ddd 180deg 270deg,
            transparent 270deg
          ) 50% 50% / 16px 16px, #fff`,
      },
    ],
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
})
