import mock from '~/lib/mock'
import { type User } from '~/lib/api'

type Me = {
  user: User | undefined
}

export const useMeStore = () => {
  const meState = useState<Me>('me')

  const fetchMe = async () => {
    try {
      const me = await mock.getMe()
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
    await mock.logout()
  }

  return {
    me: meState,
    fetchMe,
    logout
  }
}
