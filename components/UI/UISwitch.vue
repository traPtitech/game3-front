<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { useField } from 'vee-validate'

type Props = {
  label: string;
  name: string;
  trueState: string;
  falseState: string;
  defaultValue?: boolean;
  helperText?: string;
}
const props = defineProps<Props>()
const { value, errorMessage, meta } = useField<boolean>(() => props.name)
</script>

<template>
  <label class="flex flex-col gap-2">
    <div class="flex items-end gap-2 text-label text-brand-violet">
      {{ props.label }}
      <div v-if="meta.required" class="text-caption text-text-semantic-error">
        必須
      </div>

    </div>
    <div class="flex gap-4">
      <SwitchRoot
        v-model:checked="value"
        :name="props.name"
        class="relative h-28px w-46px flex cursor-default rounded-full bg-brand-violet/50 shadow data-[state=checked]:bg-brand-violet focus-within:(outline-black outline)"
      >
        <SwitchThumb
          class="my-auto block h-24px w-24px translate-x-0.5 rounded-full bg-white shadow transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-20px"
        />
      </SwitchRoot>
      現在の状態：{{ value ? props.trueState : props.falseState }}
    </div>
    <div
      v-if="errorMessage"
      class="text-caption text-text-semantic-error"
    >
      {{ errorMessage }}
    </div>
  </label>
</template>
