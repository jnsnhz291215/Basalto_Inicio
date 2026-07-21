import { createRouter, createWebHistory } from 'vue-router'
import * as authApi from '../api/auth'
import MainLayout from '../components/MainLayout.vue'
import IndexView from '../views/IndexView.vue'
import ServiciosView from '../views/ServiciosView.vue'
import NosotrosView from '../views/NosotrosView.vue'
import ProyectosView from '../views/ProyectosView.vue'
import TrabajaView from '../views/TrabajaView.vue'
import ContactoView from '../views/ContactoView.vue'
import SinPermisoView from '../views/SinPermisoView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'inicio', component: IndexView },
        { path: 'servicios', name: 'servicios', component: ServiciosView },
        { path: 'nosotros', name: 'nosotros', component: NosotrosView },
        { path: 'proyectos', name: 'proyectos', component: ProyectosView },
        { path: 'trabaja-con-nosotros', name: 'trabaja', component: TrabajaView },
        { path: 'contacto', name: 'contacto', component: ContactoView },
        { path: 'login', name: 'login', component: IndexView }
      ]
    },
    { path: '/sin-permiso', name: 'sin-permiso', component: SinPermisoView }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

function hasRequiredRole(userRole, requiredRole) {
  if (!requiredRole) return true
  return Array.isArray(requiredRole)
    ? requiredRole.includes(userRole)
    : userRole === requiredRole
}

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  try {
    const response = await authApi.fetchMe()
    const user = response?.success ? authApi.persistSessionProfile(response) : null

    if (!user) {
      authApi.clearProfile()
      return { path: '/login', query: { returnTo: to.fullPath } }
    }

    if (!hasRequiredRole(user.role, to.meta.role)) {
      return { name: 'sin-permiso' }
    }

    return true
  } catch {
    authApi.clearProfile()
    return { path: '/login', query: { returnTo: to.fullPath } }
  }
})

export default router
