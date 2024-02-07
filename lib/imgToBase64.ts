export const imgToBase64 = async (url: string): Promise<string> => {
  const res = await fetch(url)

  if (process.browser && window.FileReader) {
    const blob = await res.blob()
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } else {
    const blob = await res.blob()
    const arrayBuffer = await blob.arrayBuffer()
    return `data:${blob.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`
  }
}
