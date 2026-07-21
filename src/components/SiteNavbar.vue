<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="brand" to="/" aria-label="Basalto Drilling">
        <img class="brand-icon" src="/icono.png" alt="" />
        <span class="brand-text">
          <span class="brand-name">Basalto Drilling</span>
          <span class="brand-tag">Sondajes Mineros</span>
        </span>
      </RouterLink>

      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="navOpen"
        aria-controls="site-nav"
        aria-label="Abrir menú"
        @click="navOpen = !navOpen"
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="site-nav" class="site-nav" :class="{ open: navOpen }" aria-label="Principal">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          active-class=""
          exact-active-class="nav-active"
          @click="navOpen = false"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink class="btn btn-solid nav-cta" to="/contacto" @click="navOpen = false">
          Solicitar cotización
        </RouterLink>
      </nav>

      <div class="header-actions">
        <button
          v-if="isAuthenticated"
          class="auth-link"
          type="button"
          :disabled="loading"
          @click="$emit('logout')"
        >
          {{ userName }} · Salir
        </button>
        <RouterLink class="btn btn-solid" to="/contacto">Solicitar cotización</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

defineProps({
  isAuthenticated: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  userName: { type: String, default: '' }
})

defineEmits(['logout'])

const navOpen = ref(false)

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Trabaja con nosotros', to: '/trabaja-con-nosotros' },
  { label: 'Contacto', to: '/contacto' }
]
</script>
