import api, { type User } from '~/lib/api'

type Me = {
  user: User | undefined
}

export const useMeStore = () => {
  const meState = useState<Me>('me')

  const fetchMe = async () => {
    try {
      const me = await api.getMe()
      meState.value = {
        user: me
      }
      return me
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
    await api.logout()
  }

  return {
    me: meState,
    fetchMe,
    logout
  }
}
