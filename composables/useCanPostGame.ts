type CanPost =
  | 'enabled' // 投稿可能
  | 'prePeriod' // 投稿期間が始まっていない
  | 'postPeriod' // 投稿期間が終わっている
  | 'notLoggedIn' // ログインしていない
  | undefined;

export const useCanPostGame = () => {
  const { data: currentEvent } = useCurrentEventQuery()
  const { useMeStore } = useLogin()
  const me = useMeStore()
  const today = new Date()

  return computed<CanPost>(() => {
    if (currentEvent.value) {
      if (today < currentEvent.value.gameSubmissionPeriodStart) {
        return 'prePeriod'
      } else if (currentEvent.value.gameSubmissionPeriodEnd < today) {
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
