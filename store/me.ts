import { useGetMeQuery, useMutateLogout } from '~/composables/useQuery'
import { type User } from '~/lib/api'

type Me = {
  user: User | undefined
}

export const useMe = () => {
  const useMeStore = () => useState<Me>('me', () => ({ user: undefined }))

  const { mutateAsync: mutateLogout } = useMutateLogout()

  const fetchMe = () => {
    const me = useMeStore()
    try {
      const { data } = useGetMeQuery()
      me.value = {
        user: data.value
      }
      return data.value
    } catch (e) {
      me.value = {
        user: undefined
      }
      return undefined
    }
  }

  const logout = async () => {
    const me = useMeStore()
    me.value = {
      user: undefined
    }
    await mutateLogout()
  }

  return {
    useMeStore,
    fetchMe,
    logout
  }
}
