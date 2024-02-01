import { useMutation, useQuery } from '@tanstack/vue-query'
import { AuthApi, Configuration, EventsApi, GamesApi, UsersApi, type PostGameRequest, type GetEventRequest, type GetEventGamesRequest, type GetGameRequest, type GetGamesRequest, type GetEventTermsRequest } from '~/lib/api'

const apiConfig = new Configuration({
  basePath: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api'
})

const eventsApi = new EventsApi(apiConfig)

export const useEventsQuery = () => useQuery({
  queryKey: ['events'],
  queryFn: () => eventsApi.getEvents()
})

export const useEventQuery = (req: GetEventRequest) => {
  return useQuery({
    queryKey: ['events', req],
    queryFn: () => eventsApi.getEvent(req)
  })
}

export const useEventTermsQuery = (req: GetEventTermsRequest) => {
  return useQuery({
    queryKey: ['events', req, 'terms'],
    queryFn: () => eventsApi.getEventTerms(req)
  })
}

export const useCurrentEventQuery = () => useQuery({
  queryKey: ['currentEvent'],
  queryFn: () => eventsApi.getCurrentEvent()
})

export const useEventGamesQuery = (req: GetEventGamesRequest) => useQuery({
  queryKey: ['events', req, 'games'],
  queryFn: () => eventsApi.getEventGames(req)
})

const gamesApi = new GamesApi(apiConfig)

export const useGamesQuery = (req: GetGamesRequest) => useQuery({
  queryKey: ['games'],
  queryFn: () => gamesApi.getGames(req)
})

export const useGameQuery = (req: GetGameRequest) => useQuery({
  queryKey: ['games', req],
  queryFn: () => gamesApi.getGame(req)
})

export const useMutatePostGame = () => useMutation({
  mutationFn: (req: PostGameRequest) => gamesApi.postGame(req)
})

const authApi = new AuthApi(apiConfig)

export const useMutateLogin = (redirect?: string) => useMutation({
  mutationFn: () => authApi.login({ loginRequest: { redirect } })
})

export const useMutateLogout = () => useMutation({
  mutationFn: () => authApi.logout()
})

export const usersApi = new UsersApi(apiConfig)

export const useGetMeQuery = () => useQuery({
  queryKey: ['me'],
  queryFn: () => usersApi.getMe()
})
