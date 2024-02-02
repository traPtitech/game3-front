const isAdmin = () => {
  const { useMeStore } = useLogin()
  const me = useMeStore()
  return me.value.user?.role === 'admin'
}

const loginPage = '/login'

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) { return }
  if (!isAdmin()) {
    return navigateTo(loginPage + '?redirect=' + encodeURIComponent(to.path))
  }
})
