import { useMutation, useQuery } from '@tanstack/vue-query'
import { AuthApi, Configuration, EventsApi, GamesApi, UsersApi, type PostGameRequest } from '~/lib/api'

const apiConfig = new Configuration({
  basePath: '/api'
})

const eventsApi = new EventsApi(apiConfig)

export const useEventsQuery = () => useQuery({
  queryKey: ['events'],
  queryFn: () => eventsApi.getEvents()
})

export const useEventQuery = (eventId: string) => {
  return useQuery({
    queryKey: ['events', eventId],
    queryFn: () => eventsApi.getEvent({ eventId })
  })
}

export const useCurrentEventQuery = () => useQuery({
  queryKey: ['currentEvent'],
  queryFn: () => eventsApi.getCurrentEvent()
})

export const useEventGamesQuery = (eventId: string) => useQuery({
  queryKey: ['events', eventId, 'games'],
  queryFn: () => eventsApi.getEventGames({ eventId })
})

const gamesApi = new GamesApi(apiConfig)

export const useGameQuery = (gameId: string) => useQuery({
  queryKey: ['games', gameId],
  queryFn: () => gamesApi.getGame({ gameId })
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
