import { useQuery } from '@tanstack/vue-query'
import api from '~/lib/api'

export const useEventsQuery = () => useQuery({
  queryFn: api.getEvents
})

export const useEventQuery = (eventId: string) => {
  return useQuery({
    queryKey: ['events', eventId],
    queryFn: () => api.getEvent({ eventId })
  })
}

export const useCurrentEventQuery = () => useQuery({
  queryKey: ['currentEvent'],
  queryFn: api.getCurrentEvent
})

export const useGamesQuery = (eventId: string) => useQuery({
  queryKey: ['games', eventId],
  queryFn: () => api.getGames({
    eventId
  })
})

export const useGameQuery = (gameId: string) => useQuery({
  queryKey: ['games', gameId],
  queryFn: () => api.getGame({ gameId })
})
