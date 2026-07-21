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
          <li>
            <span class="contacto-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
              </svg>
            </span>
            <div>
              <strong>Teléfono</strong>
              <a href="tel:+56232166092">+56 2 3216 6092</a>
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
            required
          />
        </div>

        <div class="field">
          <label for="empresa">Empresa / minera <span>*</span></label>
          <input
            id="empresa"
            v-model.trim="form.empresa"
            type="text"
            placeholder="Minera Ejemplo S.A."
            required
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
          />
        </div>

        <button class="btn btn-solid full" type="submit">
          Enviar solicitud
          <span class="send-icon" aria-hidden="true">
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
import { reactive } from 'vue'

const form = reactive({
  nombre: '',
  empresa: '',
  mensaje: ''
})

function onSubmit() {
  const subject = encodeURIComponent(`Cotización — ${form.empresa || 'Proyecto'}`)
  const body = encodeURIComponent(
    `Nombre: ${form.nombre}\nEmpresa: ${form.empresa}\n\n${form.mensaje}`
  )
  window.location.href = `mailto:info@basaltodrilling.cl?subject=${subject}&body=${body}`
}
</script>
