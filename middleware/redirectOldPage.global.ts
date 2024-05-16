const redirectRules: {
  [key: string]: {
    redirect: string
  }
} = {
  '/event/1st': {
    redirect:
      'https://seesaawiki.jp/gamecreatercon-game3/d/%c2%e8%b0%ec%b2%f3%20GAME%5e3',
  },
  '/event/2nd': {
    redirect:
      'https://seesaawiki.jp/gamecreatercon-game3/d/%c2%e8%c6%f3%b2%f3%20GAME%5e3',
  },
  '/event/3rd': {
    redirect:
      'https://seesaawiki.jp/gamecreatercon-game3/d/%c2%e8%bb%b0%b2%f3%20GAME%5e3',
  },
  '/event/4th': {
    redirect:
      'https://seesaawiki.jp/gamecreatercon-game3/d/%c2%e8%bb%cd%b2%f3%20GAME%5e3',
  },
  '/event/5th': {
    redirect: 'https://game3.trap.jp/5th/',
  },
  '/event/6th': {
    redirect: 'https://game3.trap.jp/6th/',
  },
  '/event/7th': {
    redirect: 'https://game3.trap.jp/7th/',
  },
  '/event/8th': {
    redirect: 'https://game3.trap.jp/8th/',
  },
  '/event/9th': {
    redirect: 'https://game3.trap.jp/9th/',
  },
  '/event/10th': {
    redirect: 'https://game3.trap.jp/10th/',
  },
  '/event/15th': {
    redirect: 'https://game3.trap.jp/15th/',
  },
  '/event/16th': {
    redirect: 'https://game3.trap.jp/16th/',
  },
  '/event/17th': {
    redirect: 'https://game3.trap.jp/17th/',
  },
}

export default defineNuxtRouteMiddleware((to) => {
  if (to.path in redirectRules) {
    return navigateTo(redirectRules[to.path].redirect, {
      external: true,
      redirectCode: 302,
    })
  }
})
