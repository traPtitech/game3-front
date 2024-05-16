import withNuxt from './.nuxt/eslint.config.mjs'
import gitignore from 'eslint-config-flat-gitignore'
import unocss from '@unocss/eslint-config/flat'

export default withNuxt().append([gitignore({
  files: [".gitignore"]
}),
  unocss
])