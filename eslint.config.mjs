import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    plugins: [
      '@unocss',
      "plugin:@tanstack/eslint-plugin-query/recommended"
    ]
  }
)