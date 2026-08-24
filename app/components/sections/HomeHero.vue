<script setup lang="ts">
const backgroundRows = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15]
].map((row) => [...row, ...row])

const imageSource = (imageNumber: number) => `/static/image/bgp/${imageNumber}.jpg`
</script>

<template>
  <section id="header" class="header" aria-labelledby="hero-title">
    <div class="screenshot-grid" aria-hidden="true">
      <div
        v-for="(row, rowIndex) in backgroundRows"
        :key="rowIndex"
        class="screenshot-row"
        :class="`row${rowIndex + 1}`"
      >
        <div class="screenshot-row-inner">
          <div v-for="(imageNumber, imageIndex) in row" :key="`${rowIndex}-${imageIndex}`" class="screenshot-item">
            <img :src="imageSource(imageNumber)" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="titlebg" aria-hidden="true"></div>

    <div class="header-content">
      <h1 id="hero-title">马国乐土</h1>
      <p class="hero-subtitle">这里是马国乐土</p>
      <p class="hero-description">一个由马迷们合作开设的 Minecraft 服务器</p>
      <NuxtLink class="btn-solid-lg page-scroll" to="#list">服务器列表</NuxtLink>
    </div>
  </section>
</template>
