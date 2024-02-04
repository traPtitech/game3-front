import { basePath } from '~/lib/url'
import { useMe } from '~/store/me'

export const useLogin = () => {
  const { useMeStore, logout } = useMe()
  const { redirectPath } = useRedirectParam()

  const login = () => {
    const params = new URLSearchParams({
      redirect: basePath + (redirectPath.value ?? '/')
    })
    const authPath =
      basePath + '/api/auth/login?' + params.toString()

    // 本来はAuthApi.login()を使うべきだが
    // CORSの問題で使えないため直接location.hrefを変更しています
    window.location.href = authPath
  }

  return {
    useMeStore,
    login,
    logout
  }
}
