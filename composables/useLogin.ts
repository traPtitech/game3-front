import { useMe } from '~/store/me'

export const useLogin = () => {
  const config = useRuntimeConfig()
  const params = new URLSearchParams({
    client_id: config.public.discord.clientId,
    response_type: 'code',
    redirect_uri: config.public.discord.redirectUri,
    scope: 'identify'
  })
  const discordOauthUrl = 'https://discord.com/api/oauth2/authorize'
  const redirectUrl = `${discordOauthUrl}?${params.toString()}`

  const { useMeStore, logout } = useMe()

  const login = () => {
    // await navigateTo(redirectUrl, {
    //   external: true
    // })
    window.location.href = redirectUrl
  }

  return {
    useMeStore,
    login,
    logout
  }
}
