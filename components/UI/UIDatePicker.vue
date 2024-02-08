<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { useField } from 'vee-validate'
import { ja } from 'date-fns/locale'

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  helperText?: string;
};
const props = defineProps<Props>()
const { value, errorMessage, meta } = useField<Date>(() => props.name)
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-end gap-2 text-brand-violet label">
      {{ props.label }}
      <div v-if="meta.required" class="text-text-semantic-error caption">
        必須
      </div>
    </div>
    <div v-if="$props.helperText" class="text-text-secondary">
      {{ props.helperText }}
    </div>
    <VueDatePicker
      v-model="value"
      :teleport="true"
      locale="ja-JP"
      :format-locale="ja"
      time-picker-inline
      format="yyyy/MM/dd (E) HH:mm"
      :data-invalid="meta.validated && !meta.valid"
      class="data-[invalid=true]:[--dp-border-color:#EC0000]"
    />
    <div
      v-if="errorMessage"
      class="text-text-semantic-error caption"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
