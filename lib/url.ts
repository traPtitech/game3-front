import type { LocationQueryValue } from 'vue-router'

export const getFirstQuery = (query: LocationQueryValue | LocationQueryValue[] | undefined) => {
  if (Array.isArray(query)) {
    return query[0]
  }
  return query
}

export const getParamsArray = (params: string | string[] | undefined) => {
  if (Array.isArray(params)) {
    return params
  }
  return params ? [params] : undefined
}
