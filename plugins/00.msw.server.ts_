import { startWorker } from '~/mocks/handlers.server'

export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV === 'development') {
    startWorker()
  }
})
