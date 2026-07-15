<template>
  <div class="landing-page">
    <header class="corporate-header">
      <RouterLink class="brand-lockup" to="/" aria-label="Ir a Basaltodrilling">
        <img class="brand-logo" src="/logoBASALTO.png" alt="Basaltodrilling" />
      </RouterLink>

      <button
        v-if="isAuthenticated"
        class="auth-button profile"
        type="button"
        :disabled="loading"
        @click="onLogout"
      >
        <span>{{ user.nombre || user.rut || 'Perfil' }}</span>
        Cerrar sesión
      </button>
      <button v-else class="auth-button primary" type="button" @click="openLoginModal">
        Iniciar sesión
      </button>
    </header>

    <HeroCarousel />

    <CorporateTabs />

    <footer class="site-footer">
      <p>© 2026 Basalto Drilling. Todos los derechos reservados.</p>
      <nav aria-label="Enlaces de contacto">
        <a href="mailto:contacto@basaltodrilling.cl">contacto@basaltodrilling.cl</a>
        <a href="tel:+56000000000">+56 00 0000 0000</a>
      </nav>
    </footer>

    <div
      v-if="shouldShowLoginModal"
      class="modal-backdrop"
      role="presentation"
      @click.self="closeLoginModal"
    >
      <form class="login-modal" aria-label="Iniciar sesión" @submit.prevent="onLogin">
        <button class="modal-close" type="button" aria-label="Cerrar" @click="closeLoginModal">×</button>

        <div class="field">
          <label for="usuario">usuario</label>
          <input id="usuario" v-model.trim="rut" autocomplete="username" required />
        </div>

        <div class="field">
          <label for="password">contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>

        <p class="error" role="alert">{{ error || formError }}</p>
        <button class="btn btn-primary" type="submit" :disabled="loading">
          {{ loading ? 'Entrando…' : 'Iniciar sesión' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import CorporateTabs from '../components/CorporateTabs.vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const router = useRouter()

const { user, loading, error, bootstrapped, bootstrap, login, logout } = useAuth()
const isLoginRoute = computed(() => route.path === '/login')
const isAuthenticated = computed(() => Boolean(bootstrapped.value && user.value))
const loginModalOpen = ref(false)
const shouldShowLoginModal = computed(() => !isAuthenticated.value && (isLoginRoute.value || loginModalOpen.value))

const rut = ref('')
const password = ref('')
const formError = ref('')

onMounted(async () => {
  await bootstrap()
  if (user.value && isLoginRoute.value) redirectToReturnTo()
})

async function onLogin() {
  formError.value = ''
  try {
    await login(rut.value, password.value)
    password.value = ''
    loginModalOpen.value = false
    redirectToReturnTo()
  } catch (e) {
    formError.value = e.message || 'No se pudo iniciar sesión'
  }
}

async function onLogout() {
  await logout()
}

function openLoginModal() {
  formError.value = ''
  loginModalOpen.value = true
}

function closeLoginModal() {
  loginModalOpen.value = false
  formError.value = ''
  if (isLoginRoute.value) router.push('/')
}

function getSafeReturnTo() {
  const value = new URLSearchParams(window.location.search).get('returnTo')
  if (!value) return ''

  try {
    const url = new URL(value, window.location.origin)
    const allowedOrigin = url.origin === window.location.origin
    return allowedOrigin && url.href !== window.location.href ? url.toString() : ''
  } catch {
    return ''
  }
}

function redirectToReturnTo() {
  const returnTo = getSafeReturnTo()
  if (returnTo) window.location.href = returnTo
  else if (window.location.pathname === '/login') window.location.href = '/'
}
</script>
