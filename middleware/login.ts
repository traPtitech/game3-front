const isAuthenticated = () => {
  const { me } = useLogin()
  console.log('me', me.value)
  return me.value.user !== undefined
}

const loginPage = '/login'

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) { return }
  if (!isAuthenticated()) {
    return navigateTo(loginPage + '?redirect=' + encodeURIComponent(to.path))
  }
})
