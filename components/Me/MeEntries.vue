<script setup lang="ts">
type Props = {
  user: User;
};
const props = defineProps<Props>()

const { data: games, suspense: suspenseGames } = useGamesQuery({
  include: 'unpublished',
  userId: props.user.id
})
onServerPrefetch(async () => {
  await suspenseGames().catch(() => {})
})
</script>

<template>
  <div v-if="games">
    <ProseH2> 展示作品一覧 </ProseH2>
    <ul class="space-y-6">
      <li v-for="game in games" :key="game.id">
        <EntryRow :game="game" variant="myPage" />
      </li>
    </ul>
  </div>
</template>
