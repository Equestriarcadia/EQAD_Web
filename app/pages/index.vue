<script setup lang="ts">
import HomeAbout from '~/components/content/home/HomeAbout.vue'
import HomeHero from '~/components/content/home/HomeHero.vue'
import HomeServers from '~/components/content/home/HomeServers.vue'
import HomeStrengths from '~/components/content/home/HomeStrengths.vue'
import HomeTeam from '~/components/content/home/HomeTeam.vue'

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
