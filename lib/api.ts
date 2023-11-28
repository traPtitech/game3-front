type Event = {
  id: string; // = slug
  startAt: Date;
  endAt: Date;
  title: string; // `第${number}回`
};

type Game = {
  id: string; // uuid
  eventId: Event['id'];
  creator: string;
  creatorId: string; // discord user id
  organization: string;
  twitterId: string;
  websiteUrl: string;
  title: string;
  genre: string;
  developmentEnvironment: string;
  description: string;
  term: string;
};

export type User = {
  discordId: string;
  name: string;
  iconUrl: string;
  role: 'admin' | 'user'; // 変わるかも
};

const mockEventsData: Event[] = new Array(20).fill(null).map((_, i) => ({
  id: `${i + 1}th`,
  startAt: new Date(),
  endAt: new Date(),
  title: `第${i + 1}回`
}))

const mockGamesData: Game[] = new Array(200).fill(null).map((_, i) => ({
  id: i.toString(),
  eventId: `${(i % mockEventsData.length).toString()}th`,
  creator: `creator${i + 1}`,
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

// Event

type GetEventsResponse = {
  events: {
    id: Event['id'];
    title: Event['title'];
    startAt: Event['startAt'];
    endAt: Event['endAt'];
  }[];
};

const getEvents = (): Promise<GetEventsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        events: mockEventsData.map(event => ({
          id: event.id,
          title: event.title,
          startAt: event.startAt,
          endAt: event.endAt
        }))
      })
    }, 1000)
  })
}

type GetEventRequest = {
  eventId: Event['id'];
}

type GetEventResponse = Event;

const getEvent = (req: GetEventRequest): Promise<GetEventResponse> => {
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

type GetCurrentEventResponse = Event | null;

const getCurrentEvent = (): Promise<GetCurrentEventResponse> => {
  const event = mockEventsData[0]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(event)
    }, 1000)
  })
}

// Game

type GetGamesRequest = {
  eventId: Event['id'];
};

type getGamesResponse = {
  eventId: Event['id'];
  games: {
    gameId: Game['id'];
    title: Game['title'];
    creatorName: Game['creator'];
    description: Game['description'];
    term: Game['term'];
  }[];
};

const getGames = (req: GetGamesRequest): Promise<getGamesResponse> => {
  const games = mockGamesData
    .filter(game => game.eventId === req.eventId)
    .map(game => ({
      gameId: game.id,
      title: game.title,
      creatorName: game.creator,
      description: game.description,
      term: game.term
    }))
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eventId: req.eventId,
        games
      })
    }, 1000)
  })
}

type GetGameRequest = {
  gameId: Game['id'];
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
    discordId: 'discordId',
    name: 'name',
    iconUrl: 'iconUrl',
    role: 'user'
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
