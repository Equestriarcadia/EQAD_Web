<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  href?: string
}

withDefaults(defineProps<{
  items: BreadcrumbItem[]
  homeLabel?: string
}>(), {
  homeLabel: '主页'
})

const emit = defineEmits<{
  homeClick: [event: MouseEvent]
}>()

const handleHomeClick = (event: MouseEvent) => {
  emit('homeClick', event)
}
</script>

<template>
  <div class="ex-basic-1">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumbs">
            <NuxtLink to="/" @click="handleHomeClick">{{ homeLabel }}</NuxtLink>
            <template v-for="item in items" :key="item.label">
              <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
              <NuxtLink v-if="item.href" :to="item.href">{{ item.label }}</NuxtLink>
              <span v-else>{{ item.label }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
