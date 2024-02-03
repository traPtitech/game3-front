import { useMe } from '~/store/me'

export const useLogin = () => {
  const { useMeStore, logout } = useMe()
  const { redirectPath } = useRedirectParam()
  const config = useRuntimeConfig()

  const login = () => {
    const params = new URLSearchParams({
      redirect: config.public.basePath + (redirectPath.value ?? '/')
    })
    const authPath =
      config.public.basePath + '/api/auth/login?' + params.toString()

    // 本来はAuthApi.login()を使うべきだが
    // CORSの問題で使えないため直接location.hrefを変更しています
    window.location.href = authPath
  }

  return {
    useMeStore,
    login,
    logout
  }
}
