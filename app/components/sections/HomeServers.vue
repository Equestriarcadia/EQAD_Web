<script setup lang="ts">
import HomeServerCard from '~/components/widgets/HomeServerCard.vue'

const servers = [
  {
    title: '纯净群组',
    description: '由 R9 9900X 驱动，提供了生存、粘液和创造三个区。不限制建筑，可以建造任何大型建筑和生电机器。该服务器长期开设，你可以放心游玩！',
    addresses: ['地址：vanilla.eqad.fun'],
    version: '版本要求：1.9~26.1.1',
    image: 'https://pic.eqad.fun/EQAD_Web/vanilla.jpg',
    imageAlt: '创造世界',
    caption: '创造世界',
    host: 'vanilla.eqad.fun'
  },
  {
    title: '模组服',
    description: '由 i9 13900K 驱动。服务器长期开设，整合包不固定，但周目稳定，大可放心游玩！',
    addresses: ['主线地址：everfree.eqad.fun', '备用地址：everfree-1.eqad.fun'],
    image: 'https://pic.eqad.fun/EQAD_Web/mod.jpg',
    imageAlt: '科技 + 冒险',
    caption: '科技 + 冒险',
    host: 'everfree.eqad.fun'
  }
]
</script>

<template>
  <section id="list" class="server-list-section" aria-labelledby="server-list-title">
    <div class="col-lg-12">
      <h2 id="server-list-title" class="server-list-heading">- 我们开设的服务器 -</h2>
    </div>

    <HomeServerCard v-for="server in servers" :key="server.host" v-bind="server" />
  </section>
</template>
