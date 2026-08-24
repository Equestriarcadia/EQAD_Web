<script setup lang="ts">
import { nextTick } from 'vue'

interface NavItem {
  label: string
  href: string
  external?: boolean
}

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()
const activeHomeSection = ref<'home' | 'list'>('home')

const activeNavLabel = computed(() => {
  if (route.path.startsWith('/wiki')) {
    return '游玩指南'
  }

  if (route.path === '/status' || route.path === '/status.html') {
    return '服务状态'
  }

  if (route.path === '/') {
    return activeHomeSection.value === 'list' ? '服务器列表' : '主页'
  }

  return ''
})

const navItems = computed<NavItem[]>(() => {
  const isHomePage = route.path === '/'

  return [
    { label: '主页', href: isHomePage ? '#header' : '/#header' },
    { label: '服务器列表', href: isHomePage ? '#list' : '/#list' },
    { label: '游玩指南', href: '/wiki/main' },
    { label: '服务状态', href: '/status' },
    { label: '加入群聊', href: 'https://qm.qq.com/q/MOZWC51P4Q', external: true }
  ]
})

const closeMenu = () => {
  isMenuOpen.value = false
}

const updateHomeSection = () => {
  if (route.path !== '/') {
    activeHomeSection.value = 'home'
    return
  }

  const serverList = document.getElementById('list')
  const activeMarker = window.scrollY + Math.min(window.innerHeight * 0.3, 220)
  const serverListTop = serverList
    ? serverList.getBoundingClientRect().top + window.scrollY
    : Number.POSITIVE_INFINITY

  activeHomeSection.value = serverListTop <= activeMarker ? 'list' : 'home'
}

const updateNavigationState = () => {
  isScrolled.value = window.scrollY > 20
  updateHomeSection()
}

const handleNavClick = (item: NavItem) => {
  closeMenu()

  if (item.label === '主页') {
    activeHomeSection.value = 'home'
  }

  if (item.label === '服务器列表') {
    activeHomeSection.value = 'list'
  }
}

onMounted(() => {
  updateNavigationState()
  window.addEventListener('scroll', updateNavigationState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateNavigationState)
})

watch(() => route.path, () => {
  if (import.meta.client) {
    nextTick(updateHomeSection)
  }
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
            <NuxtLink
              v-if="!item.external"
              class="nav-link page-scroll"
              :class="{ active: activeNavLabel === item.label }"
              :aria-current="activeNavLabel === item.label ? 'page' : undefined"
              :to="item.href"
              @click="handleNavClick(item)"
            >
              {{ item.label }}
              <span v-if="activeNavLabel === item.label" class="sr-only">（当前）</span>
            </NuxtLink>
            <a
              v-else
              class="nav-link page-scroll"
              :class="{ active: activeNavLabel === item.label }"
              :aria-current="activeNavLabel === item.label ? 'page' : undefined"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              @click="handleNavClick(item)"
            >
              {{ item.label }}
              <span v-if="activeNavLabel === item.label" class="sr-only">（当前）</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
