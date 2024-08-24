import linkifyHtml from 'linkify-html'
import type { Opts } from 'linkifyjs'
import xss from 'xss'

const linkify = (raw: string, options?: Opts) => {
  const defaultOptions: Opts = {
    className: 'link',
  }
  options = { ...defaultOptions, ...options }

  const safeHtml = xss(raw)
  return linkifyHtml(safeHtml, options)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, Opts>('linkify', {
    beforeMount(el, binding) {
      el.innerHTML = linkify(el.innerHTML, binding.value)
    },
    updated(el, binding) {
      el.innerHTML = linkify(el.innerHTML, binding.value)
    },
  })
})
