<template>
  <section class="contacto-page">
    <div class="container contacto-grid">
      <div class="contacto-info">
        <p class="eyebrow">Contacto B2B</p>
        <h1>Hablemos de tu próximo proyecto</h1>
        <p class="contacto-lead">
          Cotiza servicios de sondaje para tu operación minera. Respondemos a requerimientos
          en menos de 24 horas hábiles.
        </p>

        <ul class="contacto-details">
          <li>
            <span class="contacto-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <div>
              <strong>Oficina central</strong>
              <p>Antonio Bellet 193, Of. 302, 3er piso, Providencia, Santiago</p>
            </div>
          </li>
          <li>
            <span class="contacto-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 7 9-7" />
              </svg>
            </span>
            <div>
              <strong>Email comercial</strong>
              <a href="mailto:info@basaltodrilling.cl">info@basaltodrilling.cl</a>
            </div>
          </li>
        </ul>
      </div>

      <form class="contacto-form" @submit.prevent="onSubmit">
        <div class="field">
          <label for="nombre">Nombre completo <span>*</span></label>
          <input
            id="nombre"
            v-model.trim="form.nombre"
            type="text"
            placeholder="Juan Pérez"
            autocomplete="name"
            required
            :disabled="loading"
          />
        </div>

        <div class="field">
          <label for="empresa">Empresa / minera <span>*</span></label>
          <input
            id="empresa"
            v-model.trim="form.empresa"
            type="text"
            placeholder="Minera Ejemplo S.A."
            autocomplete="organization"
            required
            :disabled="loading"
          />
        </div>

        <div class="field">
          <label for="email">Correo electrónico <span>*</span></label>
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            placeholder="juan.perez@empresa.cl"
            autocomplete="email"
            required
            :disabled="loading"
          />
        </div>

        <div class="field">
          <label for="telefono">Teléfono <span>*</span></label>
          <input
            id="telefono"
            v-model.trim="form.telefono"
            type="tel"
            placeholder="+56 9 1234 5678"
            autocomplete="tel"
            required
            :disabled="loading"
          />
        </div>

        <div class="field">
          <label for="mensaje">Requerimiento o mensaje <span>*</span></label>
          <textarea
            id="mensaje"
            v-model.trim="form.mensaje"
            rows="5"
            placeholder="Cuéntanos sobre tu faena, tipo de sondaje requerido, plazos y volumen estimado."
            required
            :disabled="loading"
          />
        </div>

        <p v-if="success" class="form-alert success" role="status">
          ¡Solicitud enviada con éxito! Te contactaremos a la brevedad.
        </p>
        <p v-if="error" class="form-alert error" role="alert">{{ error }}</p>

        <!-- Campo Honeypot (Trampa de spam) -->
        <div class="hp-field" aria-hidden="true">
          <label for="website_hp_contact">No llenar este campo</label>
          <input
            id="website_hp_contact"
            v-model="form.website_hp"
            type="text"
            name="website_hp"
            tabindex="-1"
            autocomplete="off"
          />
        </div>

        <button class="btn btn-solid full" type="submit" :disabled="loading">
          <span v-if="loading" class="btn-spinner" aria-hidden="true" />
          {{ loading ? 'Enviando…' : 'Enviar solicitud' }}
          <span v-if="!loading" class="send-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7z" />
            </svg>
          </span>
        </button>

        <p class="contacto-disclaimer">
          Al enviar este formulario aceptas ser contactado por el equipo comercial de Basalto Drilling SpA.
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { sendContacto } from '../api/publicForms'

const form = reactive({
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  mensaje: '',
  website_hp: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref('')

async function onSubmit() {
  // Honeypot: bots que llenan el campo oculto reciben éxito falso.
  if (form.website_hp.trim()) {
    success.value = true
    error.value = ''
    return
  }

  loading.value = true
  success.value = false
  error.value = ''

  try {
    await sendContacto({
      nombre: form.nombre,
      empresa: form.empresa,
      email: form.email,
      telefono: form.telefono,
      mensaje: form.mensaje,
      website_hp: form.website_hp
    })
    success.value = true
    form.nombre = ''
    form.empresa = ''
    form.email = ''
    form.telefono = ''
    form.mensaje = ''
    form.website_hp = ''
  } catch (e) {
    error.value = e.message || 'No se pudo enviar la solicitud.'
  } finally {
    loading.value = false
  }
}
</script>
