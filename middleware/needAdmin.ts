const isAdmin = () => {
  const { useMeStore } = useLogin()
  const me = useMeStore()
  return me.value.user ? me.value.user.role === 'admin' : undefined
}

const loginPage = '/login'

export default defineNuxtRouteMiddleware((to) => {
  if (isAdmin() === undefined) {
    return navigateTo(loginPage + '?redirect=' + encodeURIComponent(to.path))
  } else if (!isAdmin()) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }
})
