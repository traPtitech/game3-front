<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
import { useField } from 'vee-validate'

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  helperText?: string;
}
const props = defineProps<Props>()
const { textarea, input } = useTextareaAutosize()
const { errorMessage, meta, setValue } = useField<string>(() => props.name)

const onInput = () => {
  setValue(input.value)
}
</script>

<template>
  <label class="flex flex-col gap-2">
    <div class="flex items-end gap-2 text-label text-brand-violet">
      {{ props.label }}
      <div v-if="meta.required" class="text-caption text-text-semantic-error">
        必須
      </div>
    </div>
    <div v-if="$props.helperText" class="text-text-secondary">
      {{ props.helperText }}
    </div>
    <textarea
      ref="textarea"
      v-model="input"
      :name="props.name"
      :aria-invalid="meta.validated && !meta.valid"
      :data-invalid="meta.validated && !meta.valid"
      :placeholder="props.placeholder"
      rows="1"
      class="w-full resize-none overflow-hidden border b-border-primary rounded-2 px-4 py-3 data-[invalid=true]:b-border-semantic-error focus-visible:(outline-2 outline-brand-violet outline)"
      @input="onInput"
    />
    <div
      v-if="errorMessage"
      class="text-caption text-text-semantic-error"
    >
      {{ errorMessage }}
    </div>
  </label>
</template>
