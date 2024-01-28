import { useMutateLogin } from './useQuery'
import { useMeStore } from '~/store/me'

export const useLogin = () => {
  const { mutateAsync: mutateLogin } = useMutateLogin()
  const { me, fetchMe, logout } = useMeStore()
  const { redirect } = useRedirectParam()

  const login = async () => {
    try {
      await mutateLogin()
      await fetchMe()
      redirect()
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
