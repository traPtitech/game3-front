export const useGameImageUrl = (gameId: string, absolute?: boolean) => {
  const config = useRuntimeConfig()
  return (
    (absolute ? config.public.basePath : '') + `/api/games/${gameId}/image`
  )
}
export const useGameIconUrl = (gameId: string, absolute?: boolean) => {
  const config = useRuntimeConfig()
  return (absolute ? config.public.basePath : '') + `/api/games/${gameId}/icon`
}
export const useEventImageUrl = (eventSlug: string, absolute?: boolean) => {
  const config = useRuntimeConfig()
  return (
    (absolute ? config.public.basePath : '') + `/api/events/${eventSlug}/image`
  )
}
export const useDefaultOgpImageUrl = () => {
  const config = useRuntimeConfig()
  return config.public.basePath + '/ogp-default.png'
}
