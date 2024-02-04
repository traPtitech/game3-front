import type { LocationQueryValue } from 'vue-router'

export const getFirstQuery = (
  query: LocationQueryValue | LocationQueryValue[] | undefined
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

export const basePath = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://game3.trap.games'
