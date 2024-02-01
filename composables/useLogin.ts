import { useMutateLogin } from './useQuery'
import { useMeStore } from '~/store/me'

export const useLogin = () => {
  const { mutateAsync: mutateLogin } = useMutateLogin()
  const { me, fetchMe, logout } = useMeStore()
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
    me,
    login,
    logout
  }
}
