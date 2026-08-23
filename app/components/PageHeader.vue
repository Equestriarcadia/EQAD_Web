<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  subtitle: string
  id?: string
}>(), {
  id: 'header'
})
</script>

<template>
  <header :id="id" class="ex-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1>{{ title }}</h1>
          <h5>{{ subtitle }}</h5>
        </div>
      </div>
    </div>
  </header>
</template>
