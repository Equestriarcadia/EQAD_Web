<script setup lang="ts">
import ServerStatus from '~/components/widgets/ServerStatus.vue'

defineProps<{
  title: string
  description: string
  addresses: string[]
  version?: string
  image: string
  imageAlt: string
  caption: string
  host: string
}>()
</script>

<template>
  <article class="basic-1 server-item">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <div class="text-container">
            <h2>{{ title }}</h2>
            <div class="main-body">
              <p>{{ description }}</p>
            </div>
            <p class="codeaddr">
              <template v-for="(address, index) in addresses" :key="address">
                <br v-if="index > 0">
                {{ address }}
              </template>
            </p>
            <p v-if="version" class="server-version">
              <span style="color: rgb(224, 164, 0);">◉</span>&nbsp;&nbsp;{{ version }}
            </p>
            <ServerStatus :host="host" />
          </div>
        </div>
        <div class="col-lg-7">
          <div class="image-container">
            <img class="img-fluid" :src="image" :alt="imageAlt" loading="lazy">
          </div>
          <p class="server-caption">{{ caption }}</p>
        </div>
      </div>
    </div>
  </article>
</template>
