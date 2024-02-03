import { useMe } from '~/store/me'

export const useLogin = () => {
  const { useMeStore, logout } = useMe()
  const { redirectPath } = useRedirectParam()
  const config = useRuntimeConfig()

  const login = () => {
    const authPath =
      config.public.basePath +
      '/api/auth/login?' +
      encodeURIComponent(config.public.basePath + (redirectPath.value ?? '/'))

    window.location.href = authPath
  }

  return {
    useMeStore,
    login,
    logout
  }
}
