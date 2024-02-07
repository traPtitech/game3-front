import { basePath } from '~/lib/url'

export const useGameImageUrl = (gameId: string, absolute?: boolean) => {
  return (absolute ? basePath : '') + `/api/games/${gameId}/image`
}
export const useGameIconUrl = (gameId: string, absolute?: boolean) => {
  return (absolute ? basePath : '') + `/api/games/${gameId}/icon`
}
export const useEventImageUrl = (eventSlug: string, absolute?: boolean) => {
  return (absolute ? basePath : '') + `/api/events/${eventSlug}/image`
}
export const useDefaultOgpImageUrl = (absolute?: boolean) => {
  return (absolute ? basePath : '') + '/ogp-default.png'
}
