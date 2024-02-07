export const utcToJst = (utc: Date): Date => {
  const offsetMin = new Date().getTimezoneOffset()
  const jst = new Date(utc.getTime() + (offsetMin + 9 * 60) * 60 * 1000)
  return jst
}
