<script setup lang="ts">
interface NavItem {
  label: string
  href: string
  external?: boolean
}

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()

const navItems = computed<NavItem[]>(() => {
  const isHomePage = route.path === '/'

  return [
    { label: '主页', href: isHomePage ? '#header' : '/#header' },
    { label: '服务器列表', href: isHomePage ? '#list' : '/#list' },
    { label: '游玩指南', href: '/wiki/main' },
    { label: '服务状态', href: '/status.html' },
    { label: '加入群聊', href: 'https://qm.qq.com/q/MOZWC51P4Q', external: true }
  ]
})

const closeMenu = () => {
  isMenuOpen.value = false
}

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <header class="site-header">
    <nav
      class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top"
      :class="{ 'top-nav-collapse': isScrolled }"
      aria-label="主导航"
      @keydown.esc="closeMenu"
    >
      <NuxtLink class="navbar-brand logo-image" to="/" aria-label="EQAD Network 首页" @click="closeMenu">
        <img src="/static/image/eqadlogo_D.svg" alt="EQAD Network">
      </NuxtLink>

      <button
        class="navbar-toggler"
        type="button"
        aria-controls="navbarsExampleDefault"
        :aria-expanded="isMenuOpen"
        aria-label="切换导航菜单"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="nav-toggle-icon" aria-hidden="true">{{ isMenuOpen ? '×' : '☰' }}</span>
      </button>

      <div
        id="navbarsExampleDefault"
        class="collapse navbar-collapse"
        :class="{ show: isMenuOpen }"
      >
        <ul class="navbar-nav">
          <li v-for="item in navItems" :key="item.href" class="nav-item">
            <a
              class="nav-link page-scroll"
              :class="{ active: item.label === '主页' }"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
              @click="closeMenu"
            >
              {{ item.label }}
              <span v-if="item.label === '主页'" class="sr-only">（当前）</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
