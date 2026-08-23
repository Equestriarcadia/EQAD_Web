<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import AppHeader from '~/components/layout/AppHeader.vue'

const isLoading = ref(true)

onMounted(() => {
  window.setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <div class="site-layout">
    <Transition name="loader-fade">
      <div v-if="isLoading" class="spinner-wrapper" aria-label="页面加载中" role="status">
        <div class="loader">
          <div class="image-loader">
            <img src="/static/image/loading.svg" alt="">
          </div>
          <div class="isloading-line"></div>
        </div>
      </div>
    </Transition>

    <AppHeader />

    <main class="site-main">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
