import { getParamsArray } from '~/lib/url'

export const usePathParams = (name: string) => {
  const route = useRoute()
  const paramArray = getParamsArray(route.params[name])
  const param = paramArray?.[0]
  if (!param) {
    throw createError({
      statusCode: 404,
      statusMessage: `Not Found: ${name}=${route.params[name]}`,
    })
  }
  return param
}
