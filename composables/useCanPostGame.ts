type CanPost =
  | {
    state: 'enabled' // 投稿可能
  }
  | {
    state: 'prePeriod' // 投稿期間が始まっていない
    startAt: Date
  }
  | {
    state: 'postPeriod' // 投稿期間が終わっている
    endAt: Date
  }
  | {
    state: 'notLoggedIn' // ログインしていない
  }
  | undefined

export const useCanPostGame = (eventSlug: string) => {
  const { data: targetEvent } = useEventQuery({ eventSlug })
  const { useMeStore } = useLogin()
  const me = useMeStore()
  const today = new Date()

  return computed<CanPost>(() => {
    if (targetEvent.value) {
      if (today < targetEvent.value.gameSubmissionPeriodStart) {
        return {
          state: 'prePeriod',
          startAt: targetEvent.value.gameSubmissionPeriodStart,
        }
      }
      else if (targetEvent.value.gameSubmissionPeriodEnd < today) {
        return {
          state: 'postPeriod',
          endAt: targetEvent.value.gameSubmissionPeriodEnd,
        }
      }

      if (me.value) {
        return { state: 'enabled' }
      }
      else {
        return { state: 'notLoggedIn' }
      }
    }
    else {
      return undefined
    }
  })
}
