<script setup lang="ts">
interface Strength {
  title: string
  description: string
  image: string
  imageTitle: string
}

const strengths: Strength[] = [
  {
    title: '公益',
    description: '没有氪金，没有任何 VIP 特权\n唯一的收入只有赞助',
    image: '/static/image/strength/公益.jpg',
    imageTitle: '真的纯公益'
  },
  {
    title: '快速',
    description: 'R9 9900X + i9 13900K 双服务器\n让你的游戏体验飞起来',
    image: '/static/image/strength/快速.jpg',
    imageTitle: "Can't keep up!"
  },
  {
    title: '友善',
    description: '友善的玩家和管理\n没有任何神拳行为',
    image: '/static/image/strength/友善.jpg',
    imageTitle: '神拳'
  }
]
</script>

<template>
  <section id="str" class="cards-2" aria-labelledby="strengths-title">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2 id="strengths-title">- 我们的优势 -</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <article v-for="strength in strengths" :key="strength.title" class="card">
            <div class="card-image">
              <img
                :title="strength.imageTitle"
                class="img-fluid"
                :src="strength.image"
                :alt="strength.title"
                loading="lazy"
              >
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ strength.title }}</h3>
              <p class="strength-description">{{ strength.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.strength-description {
  white-space: pre-line;
}
</style>
