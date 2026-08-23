<script setup lang="ts">
import PageBreadcrumbs from '~/components/PageBreadcrumbs.vue'
import PageHeader from '~/components/PageHeader.vue'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface SidebarItem {
  label: string
  href: string
}

const props = defineProps<{
  title: string
  subtitle: string
  breadcrumbs: BreadcrumbItem[]
  sidebarItems: SidebarItem[]
}>()

const sectionId = (href: string) => href.startsWith('#') ? href.slice(1) : ''
const activeSection = ref(sectionId(props.sidebarItems[0]?.href ?? ''))
let scrollUpdateScheduled = false

const updateActiveSection = () => {
  const marker = window.scrollY + Math.min(window.innerHeight * 0.3, 220)
  let currentSection = sectionId(props.sidebarItems[0]?.href ?? '')

  for (const item of props.sidebarItems) {
    const id = sectionId(item.href)
    const section = document.getElementById(id)

    if (section && section.getBoundingClientRect().top + window.scrollY <= marker) {
      currentSection = id
    }
  }

  activeSection.value = currentSection
}

const scheduleActiveSectionUpdate = () => {
  if (scrollUpdateScheduled) {
    return
  }

  scrollUpdateScheduled = true
  window.requestAnimationFrame(() => {
    scrollUpdateScheduled = false
    updateActiveSection()
  })
}

const setActiveSection = (href: string) => {
  activeSection.value = sectionId(href)
}

onMounted(() => {
  updateActiveSection()
  window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true })
  window.addEventListener('resize', scheduleActiveSectionUpdate)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleActiveSectionUpdate)
  window.removeEventListener('resize', scheduleActiveSectionUpdate)
})
</script>

<template>
  <div class="wiki-page-shell">
    <PageHeader :title="title" :subtitle="subtitle" />
    <PageBreadcrumbs :items="breadcrumbs" />

    <div class="ex-basic-2">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <aside class="sidebar-nav">
              <div class="sidebar-nav-header">
                <h4><br><br><br>目录</h4>
              </div>
              <ul class="sidebar-nav-menu">
                <li v-for="item in sidebarItems" :key="item.href">
                  <NuxtLink
                    class="page-scroll"
                    :class="{ active: activeSection === sectionId(item.href) }"
                    :aria-current="activeSection === sectionId(item.href) ? 'location' : undefined"
                    :to="item.href"
                    @click="setActiveSection(item.href)"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </aside>
          </div>

          <div class="col-lg-9">
            <div class="wiki-content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
