import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  AuthApi,
  Configuration,
  EventsApi,
  GamesApi,
  UsersApi,
  TermsApi,
  type PostGameRequest,
  type GetEventRequest,
  type GetGameRequest,
  type GetGamesRequest,
  type GetEventTermsRequest,
  type PostEventRequest,
  type GetEventImageRequest,
  type PatchGameRequest,
  type GetGameIconRequest,
  type GetGameImageRequest,
  type PatchTermOperationRequest,
  type PostTermOperationRequest,
  type PatchEventRequest
} from '~/lib/api'

// 本来なら
// const config = useRuntimeConfig()
// basePath: config.public.apiUrl
// のように書くべきだが
// composableの外で`useRuntimeConfig()`が使用できないのでハードコードしています
// see: https://nuxt.com/docs/guide/concepts/auto-imports#vue-and-nuxt-composables
const apiConfig = new Configuration({
  basePath:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : '/api'
})

const eventsApi = new EventsApi(apiConfig)

// form-dataで送信するときにDate型を文字列に変換する必要がある
// see: https://github.com/OpenAPITools/openapi-generator/issues/7584
type DateToString<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};
const dateToString = <T extends object>(obj: T): DateToString<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value instanceof Date) {
      return { ...acc, [key]: value.toISOString() }
    } else {
      return { ...acc, [key]: value }
    }
  }, {} as DateToString<T>)
}

export const useEventsQuery = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: () => eventsApi.getEvents()
  })

export const useEventQuery = (req: GetEventRequest) => {
  return useQuery({
    queryKey: ['events', req],
    queryFn: () => eventsApi.getEvent(req)
  })
}

export const useEventImageQuery = (req: GetEventImageRequest) => {
  return useQuery({
    queryKey: ['events', req, 'image'],
    queryFn: () => eventsApi.getEventImage(req)
  })
}

export const useEventTermsQuery = (req: GetEventTermsRequest) => {
  return useQuery({
    queryKey: ['events', req, 'terms'],
    queryFn: () => eventsApi.getEventTerms(req)
  })
}

export const useCurrentEventQuery = () =>
  useQuery({
    queryKey: ['events', 'current'],
    queryFn: () => eventsApi.getCurrentEvent()
  })

export const useMutatePostEvent = () =>
  useMutation({
    mutationFn: (req: PostEventRequest) =>
      eventsApi.postEvent(dateToString(req) as any as PostEventRequest),
    mutationKey: ['events']
  })

export const useMutatePatchEvent = () =>
  useMutation({
    mutationFn: (req: PatchEventRequest) =>
      eventsApi.patchEvent(dateToString(req) as any as PatchEventRequest),
    mutationKey: ['events']
  })

const gamesApi = new GamesApi(apiConfig)

export const useGamesQuery = (req: GetGamesRequest) =>
  useQuery({
    queryKey: ['games'],
    queryFn: () => gamesApi.getGames(req)
  })

export const useGameQuery = (req: GetGameRequest) =>
  useQuery({
    queryKey: ['games', req],
    queryFn: () => gamesApi.getGame(req)
  })

export const useGameIconQuery = (req: GetGameIconRequest) =>
  useQuery({
    queryKey: ['games', req, 'icon'],
    queryFn: () => gamesApi.getGameIcon(req)
  })

export const useGameImageQuery = (req: GetGameImageRequest) =>
  useQuery({
    queryKey: ['games', req, 'image'],
    queryFn: () => gamesApi.getGameImage(req)
  })

export const useMutatePostGame = () =>
  useMutation({
    mutationFn: (req: PostGameRequest) => gamesApi.postGame(req),
    mutationKey: ['games']
  })

export const useMutatePatchGame = () =>
  useMutation({
    mutationFn: (req: PatchGameRequest) => gamesApi.patchGame(req),
    mutationKey: ['games']
  })

const termsApi = new TermsApi(apiConfig)

export const useTermsQuery = () =>
  useQuery({
    queryKey: ['terms'],
    queryFn: () => termsApi.getTerms()
  })

export const useMutatePostTerm = () =>
  useMutation({
    mutationFn: (req: PostTermOperationRequest) =>
      termsApi.postTerm(dateToString(req) as any as PostTermOperationRequest),
    mutationKey: ['terms']
  })

export const useMutatePatchTerm = () =>
  useMutation({
    mutationFn: (req: PatchTermOperationRequest) =>
      termsApi.patchTerm(dateToString(req) as any as PatchTermOperationRequest),
    mutationKey: ['terms']
  })

export const authApi = new AuthApi(apiConfig)

export const useMutateLogout = () =>
  useMutation({
    mutationFn: () => authApi.logout()
  })

export const usersApi = new UsersApi(apiConfig)
