import { useMe } from '~/store/me'

const params = new URLSearchParams({
  client_id: '1188893707215315045',
  response_type: 'code',
  redirect_uri:
    process.env.NODE_ENV === 'production'
      ? 'https://game3.trap.games/api/auth/callback'
      : 'http://localhost:8080/api/auth/callback',
  scope: 'identify'
})
const discordOauthUrl = 'https://discord.com/api/oauth2/authorize'
const redirectUrl = `${discordOauthUrl}?${params.toString()}`

export const useLogin = () => {
  const { useMeStore, logout } = useMe()

  const login = async () => {
    await navigateTo(redirectUrl, {
      external: true
    })
  }

  return {
    useMeStore,
    login,
    logout
  }
}
