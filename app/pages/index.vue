<script setup lang="ts">
useHead({
  title: '主页 - EQAD Network',
  meta: [
    {
      name: 'description',
      content: '马国乐土，一个由马迷们合作开设的 Minecraft 服务器。'
    }
  ]
})
</script>

<template>
  <div class="home-content">
    <HomeHero />
    <HomeAbout />
    <HomeTeam />
    <HomeStrengths />
    <HomeServers />
  </div>
</template>
