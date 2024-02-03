import { useMutateLogout } from '~/composables/useQuery'
import { type User } from '~/lib/api'

type Me = {
  user: User | undefined
}

export const useMe = () => {
  const useMeStore = () => useState<Me>('me', () => ({ user: undefined }))

  const { mutateAsync: mutateLogout } = useMutateLogout()

  const fetchMe = async () => {
    const me = useMeStore()
    try {
      const data = await usersApi.getMe()
      me.value = {
        user: data
      }
      return data
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
    try {
      await mutateLogout()
    } catch (e) {
      console.error(e)
    } finally {
      await navigateTo('/')
    }
  }

  return {
    useMeStore,
    fetchMe,
    logout
  }
}
