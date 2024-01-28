import { useGetMeQuery, useMutateLogout } from '~/composables/useQuery'
import { type User } from '~/lib/api'

type Me = {
  user: User | undefined
}

export const useMeStore = () => {
  const meState = useState<Me>('me')

  const { mutateAsync: mutateLogout } = useMutateLogout()

  const fetchMe = () => {
    try {
      const { data } = useGetMeQuery()
      meState.value = {
        user: data.value
      }
      return data.value
    } catch (e) {
      meState.value = {
        user: undefined
      }
      return undefined
    }
  }

  const logout = async () => {
    meState.value = {
      user: undefined
    }
    await mutateLogout()
  }

  return {
    me: meState,
    fetchMe,
    logout
  }
}
