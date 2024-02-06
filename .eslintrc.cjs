// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    '@unocss',
    "plugin:@tanstack/eslint-plugin-query/recommended"
  ]
}

module.exports = config
