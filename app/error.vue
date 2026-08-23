<script setup lang="ts">
import type { NuxtError } from '#app'
import AppFooter from '~/components/AppFooter.vue'
import AppHeader from '~/components/AppHeader.vue'

const props = defineProps<{
  error: NuxtError
}>()

const errorCode = computed(() => Number(props.error?.statusCode) || 404)
const pageTitle = computed(() => {
  if (errorCode.value === 403) {
    return '拒绝访问'
  }

  if (errorCode.value === 404) {
    return '页面不存在'
  }

  return '页面发生错误'
})

const errorMessage = computed(() => {
  if (errorCode.value === 403) {
    return '你的访问请求被服务器拒绝'
  }

  if (errorCode.value === 404) {
    return '你访问了一个不存在的页面'
  }

  return props.error?.statusMessage || '页面加载失败'
})

const goHome = () => clearError({ redirect: '/' })

useHead({
  title: computed(() => `${pageTitle.value} - EQAD Network`)
})
</script>

<template>
  <div class="site-layout error-page">
    <AppHeader />

    <main class="site-main">
      <header id="error" class="ex-header">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h1>{{ pageTitle }}</h1>
              <h5>Code:{{ errorCode }}</h5>
            </div>
          </div>
        </div>
      </header>

      <div class="ex-basic-1">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumbs">
                <NuxtLink to="/" @click="goHome">主页</NuxtLink>
                <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;{{ errorCode }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="info" class="basic-2">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-container">
                <p>
                  <img class="error-image" src="/static/image/error.gif" width="250" height="250" alt="错误提示">
                  <br>
                  <br>
                  <br>
                  {{ errorMessage }}<br>
                  <a href="/" @click.prevent="goHome"><strong>返回主页</strong></a><br>
                  <br>
                  <br>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
