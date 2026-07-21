<template>
  <div class="landing-page">
    <SiteNavbar />

    <main class="page-main">
      <RouterView />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteNavbar from './SiteNavbar.vue'
import SiteFooter from './SiteFooter.vue'

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }
)
</script>
