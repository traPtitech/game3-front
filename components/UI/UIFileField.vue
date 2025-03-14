<script setup lang="ts">
import { useField } from 'vee-validate'
import {
  Cropper,
  type CropperResult,
  type ImageTransforms,
  type ImageSize,
} from 'vue-advanced-cropper'

type Props = {
  label: string
  name: string
  accept?: string
  helperText?: string
} & (
  | {
    useCrop: true
    aspectRatio?: number
  }
  | {
    useCrop?: false
    aspectRatio?: undefined
  }
)
const props = defineProps<Props>()

// input要素を隠しつつbuttonを使ってフォーカスできるように
const inputRef = ref<HTMLInputElement | null>(null)
// buttonがクリックされたらinput要素のクリックを発火する
const handleInputButtonClick = () => {
  inputRef.value?.click()
}

const {
  value: blobValue,
  setValue,
  errorMessage,
  meta,
  handleChange,
  handleBlur,
} = useField<Blob | undefined>(() => props.name)

// トリミングする場合はinput要素から読み込んだ画像をここに入れる
const inputImgSrc = ref<string | undefined>(undefined)
// トリミング元画像が一度でも更新されたかどうか
const inputImgSrcUpdated = ref<boolean>(false)

onMounted(() => {
  if (props.useCrop && blobValue.value) {
    console.log('blob mounted', blobValue.value)
    inputImgSrc.value = URL.createObjectURL(blobValue.value)
    inputImgSrcUpdated.value = true
  }
})

watch(blobValue, (newVal) => {
  if (newVal && !inputImgSrcUpdated.value) {
    inputImgSrc.value = URL.createObjectURL(newVal)
    inputImgSrcUpdated.value = true
  }
})

// トリミングしない場合の画像表示用src
const imgSrc = computed<string>((previous) => {
  if (previous) {
    URL.revokeObjectURL(previous)
  }

  if (blobValue.value) {
    return URL.createObjectURL(blobValue.value)
  }
  return ''
})

const defaultSize = ({ imageSize }: { imageSize: ImageSize }): ImageSize => {
  const size = Math.min(imageSize.width, imageSize.height)
  return { width: size, height: size }
}

const removeImage = () => {
  if (inputImgSrc.value) {
    URL.revokeObjectURL(inputImgSrc.value)
  }
  inputImgSrc.value = undefined

  URL.revokeObjectURL(imgSrc.value)
  setValue(undefined)
  if (inputRef.value) {
    inputRef.value.value = ''
  }
  inputImgSrcUpdated.value = false
}

const onCropChange = (
  data: CropperResult & {
    imageTransforms: ImageTransforms
  },
) => {
  data.canvas?.toBlob((blob) => {
    if (blob) {
      setValue(blob)
    }
  })
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-end gap-2 text-brand-violet label">
      {{ props.label }}
      <div
        v-if="meta.required"
        class="text-text-semantic-error caption"
      >
        必須
      </div>
    </div>
    <div
      v-if="$props.helperText"
      class="text-text-secondary"
    >
      {{ props.helperText }}
    </div>
    <div
      v-if="imgSrc || inputImgSrc"
      class="relative w-full flex justify-center border b-border-primary rounded-2 bg-#ffffff p-1"
    >
      <Cropper
        v-if="props.useCrop && inputImgSrc"
        class="cropper h-128 w-full"
        background-class="bg-check!"
        :src="inputImgSrc"
        :auto-zoom="true"
        :stencil-props="{
          aspectRatio: props.aspectRatio,
        }"
        :default-size="defaultSize"
        image-restriction="stencil"
        @change="onCropChange"
      />
      <img
        v-else-if="!props.useCrop && imgSrc"
        :src="imgSrc"
        class="h-64 w-auto b-1 b-border-primary object-contain bg-check"
      >
      <LoadingIndicator v-else />
      <button
        class="absolute right-2 top-2 flex appearance-none items-center justify-center gap-2 b-2 b-border-semantic-error rounded-full bg-surface-primary p-2 p-2 text-text-semantic-error hover:bg-#FEE6E6"
        type="button"
        @click="removeImage"
      >
        <div class="i-tabler:trash h-1.5em w-1.5em" />
        別の画像を使用する
      </button>
    </div>
    <button
      v-else
      type="button"
      class="w-full flex cursor-pointer items-center gap-2 border b-border-primary rounded-2 px-4 py-3 text-text-secondary data-[invalid=true]:b-border-semantic-error focus-visible:(outline-2 outline-brand-violet outline)"
      @click="handleInputButtonClick"
    >
      <div class="i-tabler:plus h-1.5em w-1.5em color-text-secondary" />
      画像を選択
    </button>
    <input
      ref="inputRef"
      type="file"
      :name="props.name"
      :accept="props.accept"
      :aria-invalid="meta.validated && !meta.valid"
      :data-invalid="meta.validated && !meta.valid"
      class="hidden"
      @input="handleChange"
      @blur="handleBlur"
    >
    <div
      v-if="errorMessage"
      class="text-text-semantic-error caption"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
