import type { LocationQueryValue } from 'vue-router'

export const getFirstQuery = (
  query: LocationQueryValue | LocationQueryValue[] | undefined,
) => {
  if (Array.isArray(query)) {
    return query[0] ?? undefined
  }
  return query ?? undefined
}

export const getParamsArray = (params: string | string[] | undefined) => {
  if (Array.isArray(params)) {
    return params
  }
  return params ? [params] : undefined
}

// 本来なら
// const config = useRuntimeConfig()
// basePath = config.public.basePath
// のように書くべきだが
// composableの外で`useRuntimeConfig()`が使用できず不便なのでハードコードしています
// see: https://nuxt.com/docs/guide/concepts/auto-imports#vue-and-nuxt-composables
export const basePath = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://ogp-test-game3.trap.show'
