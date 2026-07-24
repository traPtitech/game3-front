import * as v from 'valibot'

const ZIP_MIME_TYPES = new Set([
  'application/zip',
  'application/x-zip-compressed',
])

const isZipFile = (input: unknown) => {
  if (!(input instanceof Blob)) {
    return false
  }

  if (input instanceof File && input.name.toLowerCase().endsWith('.zip')) {
    return true
  }

  return ZIP_MIME_TYPES.has(input.type)
}

export const zipFile = (message = 'ゲームビルドはZIPファイルを選択してください') =>
  v.pipe(
    v.blob(),
    v.custom(isZipFile, message),
  )