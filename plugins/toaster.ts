import { useToast } from 'vue-toast-notification'

const toast = useToast({
  position: 'bottom-right',
  duration: 5000,
  pauseOnHover: true,
})

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast,
    },
  }
})
