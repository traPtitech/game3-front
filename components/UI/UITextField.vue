<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'
import { useField } from 'vee-validate'

type Props = {
  label: string;
  name: string;
  type?: Exclude<InputTypeHTMLAttribute, 'file'>;
  placeholder?: string;
}
const props = defineProps<Props>()
const { value, errorMessage, meta } = useField(() => props.name)
</script>

<template>
  <label class="flex flex-col gap-2">
    <div class="flex items-end gap-2 text-label text-brand-violet">
      {{ props.label }}
      <div v-if="meta.required" class="text-caption text-text-semantic-error">
        必須
      </div>
    </div>
    <input
      v-model="value"
      :type="props.type"
      :name="props.name"
      :aria-invalid="meta.validated && !meta.valid"
      :data-invalid="meta.validated && !meta.valid"
      :placeholder="props.placeholder"
      class="w-full border b-border-primary rounded-2 px-4 py-3 data-[invalid=true]:b-border-semantic-error focus-visible:(outline-2 outline-brand-violet outline)"
    >
    <div
      v-if="errorMessage"
      class="text-caption text-text-semantic-error"
    >
      {{ errorMessage }}
    </div>
  </label>
</template>
