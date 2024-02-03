import { useMe } from '~/store/me'

export const useLogin = () => {
  const config = useRuntimeConfig()
  const params = new URLSearchParams({
    client_id: config.discord.clientId,
    response_type: 'code',
    redirect_uri: config.discord.redirectUri,
    scope: 'identify'
  })
  const discordOauthUrl = 'https://discord.com/api/oauth2/authorize'
  const redirectUrl = `${discordOauthUrl}?${params.toString()}`

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
