<script setup lang="ts">
import type { User } from '~/lib/api'

type Props = {
  user: User;
};
const props = defineProps<Props>()

const { data: games, isLoading } = useGamesQuery({
  userId: props.user.userId,
  includeUnpublished: true
})
</script>

<template>
  <div>
    <ProseH2> 展示作品一覧 </ProseH2>
    <div v-if="!isLoading && games">
      <ul v-if="games.length > 0" class="space-y-6">
        <li v-for="game in games" :key="game.id">
          <EntryRow :game="game" variant="myPage" />
        </li>
      </ul>
      <div v-else class="text-center">
        展示作品がありません
      </div>
    </div>
    <div v-else>
      <LoadingIndicator />
    </div>
  </div>
</template>
