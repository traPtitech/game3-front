type CanPost =
  | 'enabled' // 投稿可能
  | 'prePeriod' // 投稿期間が始まっていない
  | 'postPeriod' // 投稿期間が終わっている
  | 'notLoggedIn' // ログインしていない
  | undefined;

export const useCanPostGame = (eventSlug: string) => {
  const { data: targetEvent } = useEventQuery({ eventSlug })
  const { useMeStore } = useLogin()
  const me = useMeStore()
  const today = new Date()

  return computed<CanPost>(() => {
    if (targetEvent.value) {
      if (today < targetEvent.value.gameSubmissionPeriodStart) {
        return 'prePeriod'
      } else if (targetEvent.value.gameSubmissionPeriodEnd < today) {
        return 'postPeriod'
      }

      if (me.value) {
        return 'enabled'
      } else {
        return 'notLoggedIn'
      }
    } else {
      return undefined
    }
  })
}
