import { eventsApi, gamesApi } from '~/composables/useQuery'

export default defineSitemapEventHandler(() => {
  const events = eventsApi.getEvents()
  const games = gamesApi.getGames({
    includeUnpublished: false
  })

  return Promise.all([events, games]).then(([events, games]) => [
    ...(events.flatMap(event => [
      asSitemapUrl({ loc: `/event/${event.slug}` }),
      asSitemapUrl({ loc: `/event/${event.slug}/games` })
    ]) ?? []),
    ...(games.map(game => asSitemapUrl({ loc: `/entry/${game.id}` })) ?? [])
  ])
})
