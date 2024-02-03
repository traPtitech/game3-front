import { authApi } from './useQuery'
import { useMe } from '~/store/me'

export const useLogin = () => {
  const { useMeStore, logout } = useMe()
  const { redirectPath } = useRedirectParam()

  const login = async () => {
    await authApi.login({
      redirect: redirectPath.value ?? '/'
    })
  }

  return {
    useMeStore,
    login,
    logout
  }
}
