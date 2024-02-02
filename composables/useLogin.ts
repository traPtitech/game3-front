import { useMutateLogin } from './useQuery'
import { useMe } from '~/store/me'

export const useLogin = () => {
  const { mutateAsync: mutateLogin } = useMutateLogin()
  const { useMeStore, fetchMe, logout } = useMe()
  const { redirectPath } = useRedirectParam()

  const login = async () => {
    try {
      await mutateLogin(redirectPath.value)
      await fetchMe()
    } catch (e) {
      console.error(e)
    }
  }

  return {
    useMeStore,
    login,
    logout
  }
}
