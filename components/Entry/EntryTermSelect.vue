<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxCancel,
  ComboboxContent,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport
} from 'radix-vue'
import { useField } from 'vee-validate'

type Props = {
  label: string;
  name: string;
  helperText?: string;
  eventSlug?: string;
};
const props = defineProps<Props>()

const { data: termsData, suspense: suspenseTerms } = props.eventSlug
  ? useEventTermsQuery({ eventSlug: props.eventSlug })
  : useTermsQuery()

onServerPrefetch(async () => {
  await suspenseTerms().catch(() => {})
})

const termGroups = computed(() => {
  if (termsData.value === undefined) {
    return {}
  }
  return Object.groupBy(termsData.value, term => term.eventSlug)
})
const displayValue = (value: string | null) => {
  if (value === null) {
    return ''
  }
  const term = termsData.value?.find(term => term.id === value)
  if (term === undefined) {
    return ''
  }
  return (
    `${term.eventSlug} ${termGroups.value[term.eventSlug]?.find(
      t => t.id === value
    )?.name} - ${term.id}` ?? ''
  )
}

const { value, errorMessage, meta } = useField<string>(() => props.name)
</script>

<template>
  <label class="flex flex-col gap-2">
    <div class="flex items-end gap-2 text-brand-violet label">
      {{ props.label }}
      <div v-if="meta.required" class="text-text-semantic-error label">
        必須
      </div>
    </div>
    <div v-if="$props.helperText" class="text-text-secondary">
      {{ props.helperText }}
    </div>

    <ComboboxRoot v-model="value" :display-value="displayValue">
      <ComboboxAnchor
        class="w-full flex border b-border-primary rounded-2 px-4 data-[invalid=true]:b-border-semantic-error focus-within:(outline-2 outline-brand-violet outline)"
      >
        <ComboboxInput
          placeholder="タームを選択"
          class="w-full py-3 outline-none"
        />
        <ComboboxTrigger>
          <div class="i-tabler:chevron-down h-1.5em w-1.5em" />
        </ComboboxTrigger>
        <ComboboxCancel />
      </ComboboxAnchor>

      <ComboboxPortal>
        <ComboboxContent
          position="popper"
          class="mt-2 max-h-600px w-[--radix-combobox-trigger-width] overflow-hidden overflow-y-auto b-1 b-border-secondary rounded-2 bg-surface-primary p-4 shadow"
        >
          <ComboboxViewport>
            <ComboboxGroup
              v-for="[event, terms] in Object.entries(termGroups)"
              :key="event"
            >
              <ComboboxLabel class="text-text-secondary caption">
                {{ event }}
              </ComboboxLabel>
              <ComboboxItem
                v-for="term in terms"
                :key="term.id"
                :value="term.id"
                class="relative flex cursor-pointer select-none items-center rounded-1 py-2 pl-6 leading-none data-[highlighted]:(bg-brand-violet text-text-white outline-none) body"
              >
                <ComboboxItemIndicator
                  class="i-tabler:check absolute left-0 h-1.5em w-1.5em color-brand-violet"
                />
                {{ term.name }}
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
    <div v-if="errorMessage" class="text-text-semantic-error caption">
      {{ errorMessage }}
    </div>
  </label>
</template>
