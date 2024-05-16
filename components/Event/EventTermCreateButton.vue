<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/valibot'
import { date, object, string } from 'valibot'
import { useForm } from 'vee-validate'
import { DialogRoot } from 'radix-vue'
import type { PostTermRequest } from '~/lib/api'

type Props = {
  eventSlug: string
}
const props = defineProps<Props>()

const modalOpen = ref(false)

const { $toast } = useNuxtApp()

const { mutateAsync } = useMutatePostTerm()

const { handleSubmit, meta, isSubmitting } = useForm<PostTermRequest>({
  validationSchema: toTypedSchema(
    object({
      startAt: date(),
      endAt: date(),
      eventSlug: string(),
    }),
  ),
  initialValues: {
    eventSlug: props.eventSlug,
  },
})
const onSubmit = handleSubmit(async (values) => {
  try {
    await mutateAsync(
      {
        postTermRequest: {
          ...values,
        },
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
    <UIButton
      type="button"
      @click="modalOpen = true"
    >
      ターム新規作成
    </UIButton>
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
            作成
          </UIButton>
        </div>
      </form>
    </UIDialog>
  </DialogRoot>
</template>
