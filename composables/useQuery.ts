import { useQuery } from '@tanstack/vue-query'
import { Configuration, EventsApi, GamesApi } from '~/lib/api'

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
