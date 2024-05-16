import gitignore from 'eslint-config-flat-gitignore'
import unocss from '@unocss/eslint-config/flat'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt().append([gitignore({
  files: ['.gitignore'],
}),
unocss,
])
