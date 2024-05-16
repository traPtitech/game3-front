const isAuthenticated = () => {
  const { useMeStore } = useLogin()
  const me = useMeStore()
  return me.value.user !== undefined
}

const loginPage = '/login'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  if (!isAuthenticated()) {
    return navigateTo(loginPage + '?redirect=' + encodeURIComponent(to.path))
  }
})
