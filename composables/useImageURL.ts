import { basePath } from '~/lib/url'

export const useGameImageUrl = (gameId: string) => {
  return basePath + `/api/games/${gameId}/image`
}
export const useGameIconUrl = (gameId: string) => {
  return basePath + `/api/games/${gameId}/icon`
}
export const useEventImageUrl = (eventSlug: string) => {
  return basePath + `/api/events/${eventSlug}/image`
}
export const useDefaultOgpImageUrl = () => {
  return basePath + '/ogp-default.png'
}
