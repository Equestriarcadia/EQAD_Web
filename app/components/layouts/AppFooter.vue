<script setup lang="ts">
const footerLinks = [
  { label: '马国记忆', href: 'https://eqmemory.cn/' },
  { label: '小马社区', href: 'https://mc.eqcommunity.cn/' },
  { label: '羽梦千景', href: 'https://raku404.com/' },
  { label: 'Pudding', href: 'https://mlp.puudding.top/' },
  { label: '薄荷树莓', href: 'https://mintnet.20percent.cool/' }
]

const rotatingTexts = [
  'Friendship is magic',
  '友谊是魔法',
  '千景是甜贝儿，甜贝儿是千景',
  '红温了',
  '《你们管理怎么都那么容易红温》',
  '都是开创造拿的.jpg',
  '最新消息：科学家发现，吃饭可以缓解饥饿',
  '原神，____',
  '笨蛋',
  '命令 /co i 可以查熊哦',
  "Can't keep up!"
]

const activeTextIndex = ref(0)
let rotatingTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  rotatingTimer = setInterval(() => {
    activeTextIndex.value = (activeTextIndex.value + 1) % rotatingTexts.length
  }, 2000)
})

onBeforeUnmount(() => {
  if (rotatingTimer) {
    clearInterval(rotatingTimer)
  }
})
</script>

<template>
  <footer class="copyright">
    <div class="copyright-container">
      <div class="copyright-logo">
        <NuxtLink to="/" aria-label="返回首页">
          <img src="/static/image/eqadlogo_D.svg" alt="EQAD Network">
        </NuxtLink>
        <div class="copyright-logo-text">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Equestriarcadia/EQAD_Web">
            Copyright © Equestriarcadia
          </a><br>
          <span>该网站的源代码已使用 GPL-3.0 许可证开放</span>
        </div>
      </div>

      <div class="copyright-info">
        <div class="copyright-links">
          <template v-for="(link, index) in footerLinks" :key="link.href">
            <span v-if="index > 0" class="footer-link-separator" aria-hidden="true">·</span>
            <a target="_blank" rel="noopener noreferrer" :href="link.href">{{ link.label }}</a>
          </template>
        </div>

        <div class="copyright-text">
          <a target="_blank" rel="noopener noreferrer" href="https://beian.miit.gov.cn/">苏ICP备2025189220号</a>
        </div>

        <div class="rotating-text" aria-live="polite">
          <Transition name="rotating-text" mode="out-in">
            <span :key="activeTextIndex">{{ rotatingTexts[activeTextIndex] }}</span>
          </Transition>
        </div>
      </div>
    </div>
  </footer>
</template>
