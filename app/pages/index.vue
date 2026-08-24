<script setup lang="ts">
import HomeAbout from '~/components/sections/HomeAbout.vue'
import HomeHero from '~/components/sections/HomeHero.vue'
import HomeServers from '~/components/sections/HomeServers.vue'
import HomeStrengths from '~/components/sections/HomeStrengths.vue'
import HomeTeam from '~/components/sections/HomeTeam.vue'

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
