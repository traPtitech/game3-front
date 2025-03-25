<!-- `/admin/event/:slug/paper` -->
<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as v from 'valibot'
import { toTypedSchema } from '@vee-validate/valibot'
import { format } from 'date-fns'
import { vDraggable } from '@neodrag/vue'
import UITextField from '~/components/UI/UITextField.vue'
import UIButton from '~/components/UI/UIButton.vue'
import StrokedText from '~/components/StrokedText.vue'
import PaperEntry from '~/components/paper/PaperEntry.vue'
import EmbossText from '~/components/EmbossText.vue'
import UIFileField from '~/components/UI/UIFileField.vue'

definePageMeta({
  middleware: ['need-admin'],
})

const eventSlug = usePathParams('slug')

const { data: event, suspense: suspenseEvent } = useEventQuery({ eventSlug })
const { data: games, suspense: suspenseGames } = useGamesQuery({ eventSlug })
const { data: eventTerms, suspense: suspenseEventTerms } = useEventTermsQuery({
  eventSlug,
})

onServerPrefetch(async () => {
  await Promise.all([suspenseEvent(), suspenseGames(), suspenseEventTerms()])
})

const { values } = useForm({
  validationSchema: toTypedSchema(
    v.object({
      place: v.string(),
      supportLogo: v.optional(v.blob()),
      openWithIn: v.string(),
      entryCount: v.pipe(v.number(), v.integer(), v.minValue(1)),
    }),
  ),
  initialValues: {
    place: '東京科学大学 大岡山キャンパス 西講義棟2 XXX講義室',
    openWithIn: '13:00-18:00',
    entryCount: 5,
  },
})
const termGamesMap = computed(() => {
  if (!games.value || !eventTerms.value) {
    return []
  }
  const gameMap = Object.groupBy(games.value, game => game.termId)
  return eventTerms.value
    .filter(term => !term.isDefault)
    .toSorted((a, b) => a.startAt.getTime() - b.startAt.getTime())
    .map(term => ({
      term,
      games: gameMap[term.id]?.toSorted(
        (a, b) => a.place?.localeCompare(b.place ?? '') ?? 0,
      ) || [],
    }))
})

const supportLogoSrc = computed<string | undefined>((previous) => {
  if (previous) {
    URL.revokeObjectURL(previous)
  }

  if (values.supportLogo) {
    try {
      return URL.createObjectURL(values.supportLogo as Blob)
    }
    catch (e) {
      console.error(e)
    }
  }
  return undefined
})

const printTargetRef = ref<HTMLElement | null>(null)
const bottomSurfaceRef = ref<HTMLElement | null>(null)
const handleBeforePrint = () => {
  if (printTargetRef.value) {
    const copiedContent = printTargetRef.value.innerHTML

    // body直下のdivにhidden classを付与する
    const c = document.body.children
    for (let i = 0; i < c.length; i++) {
      c[i].classList.add('hidden')
    }

    const printDiv = document.createElement('div')
    printDiv.innerHTML = copiedContent
    printDiv.id = 'printDiv'
    document.body.appendChild(printDiv)
  }
}

const handleAfterPrint = () => {
  // body直下のdivからhidden classを削除する
  const c = document.body.children
  for (let i = 0; i < c.length; i++) {
    c[i].classList.remove('hidden')
  }

  const printDiv = document.getElementById('printDiv')
  if (printDiv) {
    printDiv.remove()
  }
}

const triggerPrint = () => {
  if (printTargetRef.value) {
    window.print()
  }
}

onMounted(() => {
  window.addEventListener('beforeprint', handleBeforePrint)
  window.addEventListener('afterprint', handleAfterPrint)
})

onUnmounted(() => {
  window.removeEventListener('beforeprint', handleBeforePrint)
  window.removeEventListener('afterprint', handleAfterPrint)
})
</script>

<template>
  <div v-if="event && games">
    <ProseH1
      :breadcrumbs="[
        { label: '管理者ページ', to: '/admin' },
        { label: 'イベント管理', to: '/admin/event' },
        { label: event?.title, to: `/admin/event/${event?.slug}` },
      ]"
    >
      イベントペーパー
    </ProseH1>
    <p>
      イベントペーパーを印刷/PDF出力することができます。
    </p>
    <ul class="list-disc pl-10">
      <li>
        ページ下部にあるフォームで、開催場所, 協賛企業ロゴ画像, 裏面での1行当たりの作品数を設定してください
      </li>
      <li>
        表面のロゴ部分はドラッグで移動できます
      </li>
      <li>
        表面のメイン画像部分はドラッグで上下移動できます
      </li>
      <li>
        <strong>
          必ずメイン画像とロゴ画像の位置を調整してください
        </strong>
      </li>
      <li>
        <strong>
          "余白無し", "背景画像を印刷する" 設定で出力してください。
        </strong>
      </li>
      <li>
        <strong>
          出力した内容が正しいか確認してから印刷してください。表示がおかしい場合はSysAd Game3担当に問い合わせてください。
        </strong>
      </li>
    </ul>
    <div
      ref="printTargetRef"
      class="overflow-auto"
    >
      <div class="[-webkit-print-color-adjust:exact] [print-color-adjust:exact] h-297mm w-210mm print-[size:A4_portrait]">
        <div class="grid grid-rows-[minmax(0,1fr)_auto] h-full w-full overflow-hidden">
          <div class="relative">
            <div
              class="absolute w-full"
              :style="{
                height: `calc(100% + ${(bottomSurfaceRef?.clientHeight ?? 0) * 2}px)`,
                top: `-${bottomSurfaceRef?.clientHeight ?? 0}px`,
              }"
            >
              <img
                v-draggable="{
                  bounds: 'parent',
                }"
                :src="useEventImageUrl(eventSlug)"
                class="h-auto w-full cursor-n-resize object-contain"
                draggable="false"
              >
            </div>
            <div
              v-draggable="{
                bounds: 'parent',
              }"
              class="relative w-175mm cursor-move"
            >
              <div class="absolute left-62mm top-2mm text-36pt font-extrabold tracking-0.08em font-agency">
                <EmbossText>
                  {{ event.slug }}
                </EmbossText>
              </div>
              <img
                src="/img/logo/Gamecube_logo_full.svg"
                class="isolate p-6"
                draggable="false"
              >
              <div class="absolute bottom-1mm left-62mm text-33pt font-extrabold tracking-0.08em font-agency">
                <EmbossText>
                  {{ format(event.date, "yyyy.MM.dd") }}
                </EmbossText>
                <EmbossText class="ml-2mm text-24pt">
                  {{ values.openWithIn }}
                </EmbossText>
              </div>
            </div>
          </div>
          <div
            ref="bottomSurfaceRef"
            class="z-1"
          >
            <div
              class="w-full from-#FFE001 via-#FFD004 to-#FE900F via-66% bg-gradient-to-b py-1 text-center font-extrabold"
            >
              <StrokedText
                class="c-brand-violet text-stroke-white!"
                :width="2"
              >
                開催場所 ・・・・・・ {{ values.place }}
              </StrokedText>
            </div>
            <div class="h-20mm flex justify-center bg-white text-6 c-brand-violet font-extrabold">
              <div class="grid grid-cols-[auto_minmax(0,1fr)] grid-rows-1 h-full max-w-50% items-center justify-center gap-10 px-4 pb-4mm pt-2mm">
                <div>
                  主催
                </div>
                <img
                  src="/img/logo/traP_logo_full.svg"
                  class="h-full w-auto object-contain"
                >
              </div>
              <div
                v-if="supportLogoSrc"
                class="grid grid-cols-[auto_minmax(0,1fr)] grid-rows-1 h-full max-w-50% items-center justify-center gap-10 overflow-hidden px-4 pb-4mm pt-2mm"
              >
                <div>
                  協賛
                </div>
                <img
                  :src="supportLogoSrc"
                  class="h-full w-auto object-contain"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="[-webkit-print-color-adjust:exact] [print-color-adjust:exact] relative h-297mm w-210mm print-[size:A4_portrait]">
        <div
          class="absolute z--2 h-full w-full overflow-hidden b-2mm b-brand-yellow"
          style="background: linear-gradient(90deg,transparent,transparent 20mm,#fff 20mm,#fff 35mm, transparent 35mm,transparent 36mm,#fff 36mm,#fff 37mm, transparent 37mm,transparent 52mm,#fff 52mm,#fff 67mm, transparent 67mm,transparent 68mm,#fff 68mm,#fff 69mm, transparent 69mm,transparent 84mm,#fff 84mm,#fff 99mm, transparent 99mm,transparent 100mm,#fff 100mm,#fff 101mm, transparent 101mm), #3d1192;"
        />
        <div class="h-full w-full overflow-hidden px-10mm py-5mm space-y-4mm">
          <div
            v-for="term, i in termGamesMap"
            :key="term.term.id"
            class="relative"
          >
            <div class="absolute right-0 top-0 isolate h-16mm flex items-start">
              <div class="h-1mm w-30mm bg-white" />
              <div class="h-full w-2mm bg-white" />
              <div class="ml-1mm h-full w-1mm bg-white" />
            </div>
            <div class="mb-2mm font-extrabold tracking-0.08em font-agency">
              <EmbossText class="text-36pt">
                Term {{ i+1 }}
              </EmbossText>
              <EmbossText class="ml-2mm text-24pt">
                {{ format(term.term.startAt, "HH:mm") }}-{{ format(term.term.endAt, "HH:mm") }}
              </EmbossText>
            </div>
            <div
              class="grid gap-2"
              :style="{
                'grid-template-columns': `repeat(${values.entryCount}, minmax(0, 1fr))`,
              }"
            >
              <PaperEntry
                v-for="game in term.games"
                :key="game.id"
                :game="game"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <form
        class="space-y-4"
        @submit.prevent=""
      >
        <UITextField
          label="開催場所"
          name="place"
          helper-text="表面下部に記載されます。"
        />
        <UIFileField
          label="協賛企業ロゴ画像"
          accept="image/*"
          name="supportLogo"
          use-crop
          helper-text="表面右下に表示されます。"
        />
        <UITextField
          label="1行に表示する作品の数"
          name="entryCount"
          type="number"
        />
        <div class="flex justify-center">
          <UIButton
            type="button"
            @click="triggerPrint"
          >
            プリントダイアログを開く
          </UIButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/agency-fb?styles=17318');
</style>
