import { useQuery } from '@tanstack/vue-query'
import mock from '~/lib/mock'

export const useEventsQuery = () => useQuery({
  queryFn: mock.getEvents
})

export const useEventQuery = (eventId: string) => {
  return useQuery({
    queryKey: ['events', eventId],
    queryFn: () => mock.getEvent({ eventId })
  })
}

export const useCurrentEventQuery = () => useQuery({
  queryKey: ['currentEvent'],
  queryFn: mock.getCurrentEvent
})

export const useGamesQuery = (eventId: string) => useQuery({
  queryKey: ['games', eventId],
  queryFn: () => mock.getGames({
    eventId
  })
})

export const useGameQuery = (gameId: string) => useQuery({
  queryKey: ['games', gameId],
  queryFn: () => mock.getGame({ gameId })
})
