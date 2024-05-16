// see: https://tanstack.com/query/latest/docs/vue/guides/ssr
import type {
  DehydratedState,
  VueQueryPluginOptions,
} from '@tanstack/vue-query'
import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from '@tanstack/vue-query'

// Modify your Vue Query global settings here
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: import.meta.client ? 1000 * 60 * 60 * 2 : Infinity, // 2 hours on client, never on server
      throwOnError: false,
    },
  },
})

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')

  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value)
    })
  }
})
