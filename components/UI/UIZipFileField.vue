<script setup lang="ts">
import { useField } from 'vee-validate'

type Props = {
  label: string
  name: string
  accept?: string
  helperText?: string
}

const props = defineProps<Props>()

const inputRef = ref<HTMLInputElement | null>(null)

const handleInputButtonClick = () => {
  inputRef.value?.click()
}

const {
  value: fileValue,
  setValue,
  errorMessage,
  meta,
  handleChange,
  handleBlur,
} = useField<File | Blob | undefined>(() => props.name)

const fileName = computed(() => {
  if (!fileValue.value) {
    return ''
  }

  if ('name' in fileValue.value) {
    return fileValue.value.name
  }

  return '選択済みファイル'
})

const removeFile = () => {
  setValue(undefined)
  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const selectedFile = target.files?.[0]

  setValue(selectedFile)
  handleChange(selectedFile)
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
      v-if="fileValue"
      class="flex items-center justify-between gap-4 rounded-2 border b-border-primary bg-#ffffff px-4 py-3"
    >
      <div class="flex min-w-0 items-center gap-2">
        <div class="color-text-secondary i-tabler:file-zip h-1.5em w-1.5em" />
        <span class="truncate text-text-primary">
          {{ fileName }}
        </span>
      </div>
      <button
        class="flex appearance-none items-center gap-2 text-text-semantic-error hover:text-text-semantic-error"
        type="button"
        @click="removeFile"
      >
        <div class="i-tabler:trash h-1.5em w-1.5em" />
        取り消す
      </button>
    </div>
    <button
      v-else
      type="button"
      class="w-full flex cursor-pointer items-center gap-2 border b-border-primary rounded-2 px-4 py-3 text-text-secondary data-[invalid=true]:b-border-semantic-error focus-visible:(outline-2 outline-brand-violet outline)"
      @click="handleInputButtonClick"
    >
      <div class="i-tabler:plus h-1.5em w-1.5em color-text-secondary" />
      ZIPファイルを選択
    </button>
    <input
      ref="inputRef"
      type="file"
      :name="props.name"
      :accept="props.accept"
      :aria-invalid="meta.validated && !meta.valid"
      :data-invalid="meta.validated && !meta.valid"
      class="hidden"
      @change="onFileChange"
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
