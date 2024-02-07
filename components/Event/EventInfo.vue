<script setup lang="ts">
import type { Event } from '~/lib/api'

type Props = {
  event: Event;
};
const props = defineProps<Props>()
</script>

<template>
  <div>
    <ProseH2> イベント情報 </ProseH2>
    <ProseImg
      :src="useEventImageUrl(props.event.slug)"
      format="webp"
      height="500px"
      class="mb-4"
    />
    <ProseTable>
      <tbody>
        <tr>
          <td>タイトル</td>
          <td>
            {{ props.event.title }}
          </td>
        </tr>
        <tr>
          <td>slug</td>
          <td>
            {{ props.event.slug }}
          </td>
        </tr>
        <tr>
          <td>開催日</td>
          <td>
            {{
              props.event.date.toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })
            }}
          </td>
        </tr>
        <tr>
          <td>出展受付開始日時</td>
          <td>
            {{
              props.event.gameSubmissionPeriodStart.toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })
            }}
          </td>
        </tr>
        <tr>
          <td>出展受付終了日時</td>
          <td>
            {{
              props.event.gameSubmissionPeriodEnd.toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })
            }}
          </td>
        </tr>
      </tbody>
    </ProseTable>
  </div>
</template>
