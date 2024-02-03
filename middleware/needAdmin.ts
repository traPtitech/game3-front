const isAdmin = () => {
  const { useMeStore } = useLogin()
  const me = useMeStore()
  return me.value.user?.role === 'admin'
}

export default defineNuxtRouteMiddleware(() => {
  if (!isAdmin()) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }
})
