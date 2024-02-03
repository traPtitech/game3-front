import { authApi } from './useQuery'
import { useMe } from '~/store/me'

export const useLogin = () => {
  const { useMeStore, logout } = useMe()
  const { redirectPath } = useRedirectParam()
  const config = useRuntimeConfig()

  const login = async () => {
    await authApi.login({
      redirect: encodeURI(config.public.basePath + (redirectPath.value ?? '/'))
    })
  }

  return {
    useMeStore,
    login,
    logout
  }
}
