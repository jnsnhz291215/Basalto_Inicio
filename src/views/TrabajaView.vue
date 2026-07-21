<template>
  <section class="trabaja-page">
    <div class="container">
      <header class="trabaja-header">
        <p class="eyebrow">Trabaja con nosotros</p>
        <h1>Únete a nuestro equipo</h1>
        <p class="trabaja-lead">
          Buscamos talento para nuestras faenas. Sé parte de una operación segura,
          productiva y en constante crecimiento.
        </p>
      </header>

      <div class="vacancy-grid">
        <article v-for="role in roles" :key="role.title" class="vacancy-card">
          <div class="vacancy-top">
            <h2>{{ role.title }}</h2>
            <span class="vacancy-badge">{{ role.vacancies }} vacantes</span>
          </div>

          <ul>
            <li v-for="item in role.items" :key="item">{{ item }}</li>
          </ul>

          <button class="btn btn-solid" type="button" @click="openModal(role)">
            Postular
            <span aria-hidden="true">→</span>
          </button>
        </article>
      </div>

      <p class="trabaja-contact">
        También puedes escribirnos directamente a
        <a href="mailto:postulaciones@basaltodrilling.cl">postulaciones@basaltodrilling.cl</a>
      </p>
    </div>

    <div
      v-if="modalOpen"
      class="modal-backdrop"
      role="presentation"
      @click.self="closeModal"
    >
      <form class="postula-modal" aria-label="Formulario de postulación" @submit.prevent="onSubmit">
        <button class="modal-close" type="button" aria-label="Cerrar" @click="closeModal">×</button>

        <p class="eyebrow">Postulación</p>
        <h2>Únete a Basalto</h2>
        <p class="modal-lead">Completa tus datos y adjunta tu CV en PDF (máx. 5 MB).</p>

        <div class="field">
          <label for="postula-nombre">Nombre completo <span>*</span></label>
          <input
            id="postula-nombre"
            v-model.trim="form.nombre"
            type="text"
            required
            :disabled="loading"
          />
        </div>

        <div class="field">
          <label for="postula-rut">RUT <span>*</span></label>
          <input
            id="postula-rut"
            v-model.trim="form.rut"
            type="text"
            placeholder="12.345.678-9"
            required
            :disabled="loading"
          />
        </div>

        <div class="field">
          <label for="postula-email">Correo electrónico <span>*</span></label>
          <input
            id="postula-email"
            v-model.trim="form.email"
            type="email"
            required
            :disabled="loading"
          />
        </div>

        <div class="field">
          <label for="postula-telefono">Teléfono <span>*</span></label>
          <input
            id="postula-telefono"
            v-model.trim="form.telefono"
            type="tel"
            required
            :disabled="loading"
          />
        </div>

        <div class="field">
          <label for="postula-cargo">Cargo <span>*</span></label>
          <select id="postula-cargo" v-model="form.cargo" required :disabled="loading">
            <option disabled value="">Selecciona un cargo</option>
            <option v-for="cargo in allCargos" :key="cargo" :value="cargo">{{ cargo }}</option>
          </select>
        </div>

        <div class="field">
          <label for="postula-cv">CV (PDF) <span>*</span></label>
          <input
            id="postula-cv"
            type="file"
            accept="application/pdf,.pdf"
            required
            :disabled="loading"
            @change="onFileChange"
          />
        </div>

        <p v-if="success" class="form-alert success" role="status">
          ¡Postulación enviada con éxito! Revisaremos tu perfil a la brevedad.
        </p>
        <p v-if="error" class="form-alert error" role="alert">{{ error }}</p>

        <button class="btn btn-solid full" type="submit" :disabled="loading || success">
          <span v-if="loading" class="btn-spinner" aria-hidden="true" />
          {{ loading ? 'Enviando…' : 'Enviar postulación' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { sendPostulacion } from '../api/publicForms'

const roles = [
  {
    title: 'Operadores y Mecánicos',
    vacancies: 8,
    items: [
      'Perforista Diamantina / RC / Dual Rotary',
      'Mecánico Hidráulico',
      'Ayudante de Sondaje'
    ]
  },
  {
    title: 'Profesionales de Staff',
    vacancies: 6,
    items: [
      'Ingeniero(a) de Planificación',
      'Prevencionista de Riesgos',
      'Administrativo / Bodeguero'
    ]
  }
]

const allCargos = computed(() => roles.flatMap((role) => role.items))

const modalOpen = ref(false)
const loading = ref(false)
const success = ref(false)
const error = ref('')
const cvFile = ref(null)

const form = reactive({
  nombre: '',
  rut: '',
  email: '',
  telefono: '',
  cargo: ''
})

function openModal(role) {
  success.value = false
  error.value = ''
  cvFile.value = null
  form.nombre = ''
  form.rut = ''
  form.email = ''
  form.telefono = ''
  form.cargo = role.items[0] || ''
  modalOpen.value = true
}

function closeModal() {
  if (loading.value) return
  modalOpen.value = false
}

function onFileChange(event) {
  const file = event.target.files?.[0] || null
  cvFile.value = file
  error.value = ''

  if (file && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    error.value = 'El CV debe ser un archivo PDF.'
    cvFile.value = null
    event.target.value = ''
    return
  }

  if (file && file.size > 5 * 1024 * 1024) {
    error.value = 'El CV no puede superar los 5 MB.'
    cvFile.value = null
    event.target.value = ''
  }
}

async function onSubmit() {
  if (!cvFile.value) {
    error.value = 'Debes adjuntar tu CV en PDF.'
    return
  }

  loading.value = true
  success.value = false
  error.value = ''

  try {
    const data = new FormData()
    data.append('nombre', form.nombre)
    data.append('rut', form.rut)
    data.append('email', form.email)
    data.append('telefono', form.telefono)
    data.append('cargo', form.cargo)
    data.append('cv', cvFile.value)

    await sendPostulacion(data)
    success.value = true

    window.setTimeout(() => {
      modalOpen.value = false
    }, 1800)
  } catch (e) {
    error.value = e.message || 'No se pudo enviar la postulación.'
  } finally {
    loading.value = false
  }
}
</script>
