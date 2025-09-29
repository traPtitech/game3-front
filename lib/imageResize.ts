import Pica from 'pica'

/**
 * 画像を指定した横幅にリサイズする（高品質）
 * @param blob 元の画像Blob
 * @param maxWidth 最大横幅（px）
 * @returns リサイズされた画像Blob（PNG形式）
 */
export const resizeImage = async (
  blob: Blob,
  maxWidth: number,
): Promise<Blob> => {
  const pica = new Pica()

  return new Promise((resolve, reject) => {
    const img = new Image()
    const sourceCanvas = document.createElement('canvas')
    const targetCanvas = document.createElement('canvas')
    const ctx = sourceCanvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Canvas context not available'))
      return
    }

    const handleLoad = async () => {
      try {
        // 元の画像サイズ
        const { width: originalWidth, height: originalHeight } = img

        // リサイズが不要な場合はそのまま返す
        if (originalWidth <= maxWidth) {
          resolve(blob)
          return
        }

        // アスペクト比を保持して新しいサイズを計算
        const ratio = maxWidth / originalWidth
        const newWidth = maxWidth
        const newHeight = Math.round(originalHeight * ratio)

        // ソースCanvasに元画像を描画
        sourceCanvas.width = originalWidth
        sourceCanvas.height = originalHeight
        ctx.drawImage(img, 0, 0, originalWidth, originalHeight)

        // ターゲットCanvasのサイズを設定
        targetCanvas.width = newWidth
        targetCanvas.height = newHeight

        // picaで高品質リサイズ
        const resizedCanvas = await pica.resize(sourceCanvas, targetCanvas, {
          quality: 3, // 最高品質
        })

        // PNGとしてBlobに変換
        const resizedBlob = await pica.toBlob(resizedCanvas, 'image/png')
        resolve(resizedBlob)
      }
      catch (error) {
        reject(error)
      }
    }

    img.onload = handleLoad

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    // BlobからObjectURLを作成して画像を読み込み
    const url = URL.createObjectURL(blob)
    img.src = url

    // メモリリークを防ぐため、読み込み完了後にURLを解放
    img.addEventListener('load', () => {
      URL.revokeObjectURL(url)
    }, { once: true })
  })
}
