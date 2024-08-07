<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/valibot'
import * as v from 'valibot'
import { useForm } from 'vee-validate'
import { DialogRoot } from 'radix-vue'
import type { PatchGameRequest } from '~/lib/api'

type Props = {
  termName: string
  gameId: string
  defaultTermId: string
  eventSlug: string
  isDefault: boolean
}
const props = defineProps<Props>()

const modalOpen = ref(false)

const { $toast } = useNuxtApp()

const { mutateAsync } = useMutatePatchGame()

const { handleSubmit, meta } = useForm<
  Pick<PatchGameRequest, 'gameId' | 'termId'>
>({
  validationSchema: toTypedSchema(
    v.object({
      gameId: v.string(),
      termId: v.string(),
    }),
  ),
  initialValues: {
    gameId: props.gameId,
    termId: props.defaultTermId,
  },
})
const onSubmit = handleSubmit(async (values) => {
  try {
    await mutateAsync({
      gameId: values.gameId,
      termId: values.termId,
    })
    $toast.success('タームの割り当てが完了しました！')
    modalOpen.value = false
  }
  catch (e) {
    $toast.error('タームの割り当てに失敗しました')
    console.error(e)
  }
})
</script>

<template>
  <DialogRoot v-model:open="modalOpen">
    <button
      type="button"
      class="h-full w-full data-[default]:text-red-6"
      :data-default="props.isDefault ? true : undefined"
      @click="modalOpen = true"
    >
      {{ props.termName }}
    </button>
    <UIDialog>
      <form
        class="w-full flex flex-col gap-4"
        @submit="onSubmit"
      >
        <EntryTermSelect
          name="termId"
          label="ターム"
          :event-slug="props.eventSlug"
        />
        <div class="flex flex-col items-center gap-2 md:flex-row">
          <UIButton
            variant="secondary"
            type="button"
            @click="modalOpen = false"
          >
            キャンセル
          </UIButton>
          <UIButton
            type="submit"
            :disabled="!meta.valid || meta.pending"
          >
            変更
          </UIButton>
        </div>
      </form>
    </UIDialog>
  </DialogRoot>
</template>
