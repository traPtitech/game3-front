import type { Event, Game, GetEventGamesRequest, GetEventRequest, GetGameRequest, User } from './api'

const mockEventsData: Event[] = new Array(20).fill(null).map((_, i) => ({
  id: `${i + 1}th`,
  slug: `slug${i + 1}`,
  gameSubmissionPeriodStart: new Date(),
  gameSubmissionPeriodEnd: new Date(),
  title: `第${i + 1}回`
}))

const mockGamesData: Game[] = new Array(200).fill(null).map((_, i) => ({
  id: i.toString(),
  eventId: `${(i % mockEventsData.length).toString()}th`,
  creatorName: `creator${i + 1}`,
  creatorId: `creatorId${i + 1}`,
  organization: `organization${i + 1}`,
  twitterId: `twitter${i + 1}`,
  websiteUrl: `website${i + 1}`,
  title: `title${i + 1}`,
  genre: `genre${i + 1}`,
  developmentEnvironment: `developmentEnvironment${i + 1}`,
  description: `description${i + 1}`,
  term: `term${i + 1}`
}))

// Events
const getEvents = (): Promise<Array<Event>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEventsData)
    }, 1000)
  })
}

const getEvent = (req: GetEventRequest): Promise<Event> => {
  const event = mockEventsData.find(event => event.id === req.eventId)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!event) {
        reject(new Error('not found'))
        return
      }
      resolve(event)
    }, 1000)
  })
}

const getCurrentEvent = (): Promise<Event> => {
  const event = mockEventsData[0]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(event)
    }, 1000)
  })
}

// Game

const getGames = (req: GetEventGamesRequest): Promise<Array<Game>> => {
  const games = mockGamesData
    .filter(game => game.eventId === req.eventId)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(games)
    }, 1000)
  })
}

const getGame = (req: GetGameRequest): Promise<Game> => {
  const game = mockGamesData.find(game => game.id === req.gameId)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!game) {
        reject(new Error('not found'))
        return
      }
      resolve(game)
    }, 1000)
  })
}

// me

const getMe = (): Promise<User> => {
  const user: User = {
    user: {
      userId: 'discordId',
      username: 'name',
      profileImageUrl: 'iconUrl',
      role: 'user'
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user)
    }, 1000)
  })
}

const login = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}
const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export default {
  getEvents,
  getEvent,
  getCurrentEvent,
  getGames,
  getGame,
  getMe,
  login,
  logout
}
