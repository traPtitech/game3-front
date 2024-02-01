import { getFirstQuery } from '~/lib/url'

export const useRedirectParam = () => {
  const route = useRoute()
  const router = useRouter()
  const query = computed(() => getFirstQuery(route.query.redirect))

  const redirect = () => {
    if (!query.value) {
      router.replace('/')
      return
    }

    router.replace(query.value)
  }

  return {
    redirect,
    redirectPath: query
  }
}
