<!-- `/admin/event/:slug/event-paper` -->
<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as v from 'valibot'
import { toTypedSchema } from '@vee-validate/valibot'
import { format } from 'date-fns'
import UITextField from '~/components/UI/UITextField.vue'
import UIButton from '~/components/UI/UIButton.vue'
import StrokedText from '~/components/StrokedText.vue'
import PaperEntry from '~/components/paper/PaperEntry.vue'
import EmbossText from '~/components/EmbossText.vue'

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
      mainIllust: v.blob(),
      supportName: v.string(),
      supportLogo: v.blob(),
      openWithIn: v.string(),
    }),
  ),
  initialValues: {
    place: '東京科学大学 大岡山キャンパス 西講義棟2 XXX講義室',
    openWithIn: '13:00-18:00',
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
const printTargetRef = ref<HTMLElement | null>(null)
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
    <div
      ref="printTargetRef"
      class="overflow-auto"
    >
      <div class="h-297mm w-210mm bg-gray print-[size:A4_portrait]">
        <div class="grid grid-rows-[minmax(0,1fr)_auto] h-full w-full">
          <div class="relative">
            <img
              :src="useEventImageUrl(eventSlug)"
              class="h-full w-full object-contain"
            >
            <div class="absolute bottom-0 right-0 w-175mm">
              <div class="relative">
                <div class="absolute left-62mm top-2mm text-36pt font-extrabold tracking-0.08em font-agency">
                  <EmbossText>
                    {{ event.slug }}
                  </EmbossText>
                </div>
                <img
                  src="/img/logo/Gamecube_logo_full.svg"
                  class="isolate p-6"
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
          </div>
          <div>
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
            <div class="grid grid-cols-2 bg-white text-6 c-brand-violet font-extrabold">
              <div class="flex items-center justify-between px-8 pb-6mm pt-2">
                <div class="shrink-0">
                  主催
                </div>
                <img
                  src="/img/logo/traP_logo_full.svg"
                  class="w-60"
                >
              </div>
              <div class="flex items-center justify-between px-8 pb-6mm pt-2">
                <div class="shrink-0">
                  協賛
                </div>
                <img
                  src="/img/logo/traP_logo_full.svg"
                  class="w-60"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative h-297mm w-210mm print-[size:A4_portrait]">
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
            <div class="grid grid-cols-5 gap-2">
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
