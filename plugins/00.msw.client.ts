import { startWorker } from '~/mocks/handlers.client'

export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV === 'development') {
    startWorker()
  }
})
