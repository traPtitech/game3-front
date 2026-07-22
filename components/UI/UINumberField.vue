<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'

type Props = {
  label: string
  name: string
  placeholder?: string
  helperText?: string
  min?: number
  max?: number
  step?: number | 'any'
}
const props = defineProps<Props>()

const { value, setValue, errorMessage, meta } = useField<number | undefined>(
  () => props.name,
)

const inputValue = computed({
  get: () => value.value,
  set: (newValue: string | number | null | undefined) => {
    if (newValue === '' || newValue === null || newValue === undefined) {
      setValue(undefined)
      return
    }

    const parsedValue
      = typeof newValue === 'number' ? newValue : Number(newValue)

    setValue(Number.isNaN(parsedValue) ? undefined : parsedValue)
  },
})
</script>

<template>
  <label class="flex flex-col gap-2">
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
    <input
      v-model="inputValue"
      type="number"
      :name="props.name"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :aria-invalid="meta.validated && !meta.valid"
      :data-invalid="meta.validated && !meta.valid"
      :placeholder="props.placeholder"
      class="w-full border b-border-primary rounded-2 px-4 py-3 data-[invalid=true]:b-border-semantic-error focus-visible:(outline-2 outline-brand-violet outline)"
    >
    <div
      v-if="errorMessage"
      class="text-text-semantic-error caption"
    >
      {{ errorMessage }}
    </div>
  </label>
</template>