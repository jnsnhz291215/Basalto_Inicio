<template>
  <div class="landing-page">
    <SiteNavbar
      :is-authenticated="isAuthenticated"
      :loading="loading"
      :user-name="user?.nombre || user?.rut || 'Perfil'"
      @logout="onLogout"
    />

    <main class="page-main">
      <RouterView />
    </main>

    <SiteFooter />

    <div
      v-if="shouldShowLoginModal"
      class="modal-backdrop"
      role="presentation"
      @click.self="closeLoginModal"
    >
      <form class="login-modal" aria-label="Iniciar sesión" @submit.prevent="onLogin">
        <button class="modal-close" type="button" aria-label="Cerrar" @click="closeLoginModal">×</button>
        <h2>Iniciar sesión</h2>
        <p class="modal-lead">Accede al ecosistema Basalto con tu usuario corporativo.</p>

        <div class="field">
          <label for="usuario">Usuario</label>
          <input id="usuario" v-model.trim="rut" autocomplete="username" required />
        </div>

        <div class="field">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>

        <p class="error" role="alert">{{ error || formError }}</p>
        <button class="btn btn-solid full" type="submit" :disabled="loading">
          {{ loading ? 'Entrando…' : 'Iniciar sesión' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import SiteNavbar from './SiteNavbar.vue'
import SiteFooter from './SiteFooter.vue'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const router = useRouter()

const { user, loading, error, bootstrapped, bootstrap, login, logout } = useAuth()
const isLoginRoute = computed(() => route.path === '/login')
const isAuthenticated = computed(() => Boolean(bootstrapped.value && user.value))
const loginModalOpen = ref(false)
const shouldShowLoginModal = computed(
  () => !isAuthenticated.value && (isLoginRoute.value || loginModalOpen.value)
)

const rut = ref('')
const password = ref('')
const formError = ref('')

onMounted(async () => {
  await bootstrap()
  if (user.value && isLoginRoute.value) redirectToReturnTo()
})

watch(
  () => route.fullPath,
  () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }
)

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
