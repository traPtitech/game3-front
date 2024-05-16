<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/valibot'
import { date, object } from 'valibot'
import { useForm } from 'vee-validate'
import { DialogRoot } from 'radix-vue'
import type { PatchTermRequest, Term } from '~/lib/api'

type Props = {
  term: Term
}
const props = defineProps<Props>()

const modalOpen = ref(false)

const { $toast } = useNuxtApp()

const { mutateAsync } = useMutatePatchTerm()

const { handleSubmit, meta, isSubmitting } = useForm<PatchTermRequest>({
  validationSchema: toTypedSchema(
    object({
      startAt: date(),
      endAt: date(),
    }),
  ),
  initialValues: {
    ...props.term,
  },
})
const onSubmit = handleSubmit(async (values) => {
  try {
    await mutateAsync(
      {
        patchTermRequest: {
          ...values,
        },
        termId: props.term.id,
      },
    )
    $toast.success('イベントの編集が完了しました！')
    modalOpen.value = false
  }
  catch (e) {
    $toast.error('イベントの編集に失敗しました')
    console.error(e)
  }
})
</script>

<template>
  <DialogRoot v-model:open="modalOpen">
    <div class="flex justify-center">
      <UIButton
        type="button"
        @click="modalOpen = true"
      >
        編集
      </UIButton>
      <!-- TODO: delete button -->
    </div>
    <UIDialog>
      <form
        class="w-full flex flex-col gap-4"
        @submit="onSubmit"
      >
        <UIDatePicker
          label="ターム開始日時"
          helper-text="日付に注意"
          name="startAt"
        />
        <UIDatePicker
          label="ターム終了日時"
          helper-text="日付に注意"
          name="endAt"
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
            :disabled="!meta.valid"
            :is-loading="isSubmitting"
          >
            更新
          </UIButton>
        </div>
      </form>
    </UIDialog>
  </DialogRoot>
</template>
