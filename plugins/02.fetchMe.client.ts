import { useMe } from '~/store/me'

export default defineNuxtPlugin(async () => {
  const { fetchMe } = useMe()
  await fetchMe()
})
