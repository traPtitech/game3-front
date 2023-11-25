import api from '~/lib/api'
import { useMeStore } from '~/store/me'

export const useLogin = () => {
  const { fetchMe } = useMeStore()
  const { redirect } = useRedirectParam()

  const login = async () => {
    try {
      await api.login()
      await fetchMe()
      redirect()
    } catch (e) {
      console.error(e)
    }
  }

  return {
    login
  }
}
