import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import IndexView from '../views/IndexView.vue'
import ServiciosView from '../views/ServiciosView.vue'
import NosotrosView from '../views/NosotrosView.vue'
import ProyectosView from '../views/ProyectosView.vue'
import TrabajaView from '../views/TrabajaView.vue'
import ContactoView from '../views/ContactoView.vue'

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
        { path: 'contacto', name: 'contacto', component: ContactoView }
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router
