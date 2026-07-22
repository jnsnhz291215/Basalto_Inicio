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

      <p v-if="vacantesError" class="form-alert error" role="alert">{{ vacantesError }}</p>
      <p v-else-if="loadingVacantes" class="trabaja-lead">Cargando vacantes…</p>
      <p v-else-if="!grupos.length" class="trabaja-lead">No hay vacantes publicadas por ahora.</p>

      <div v-else class="vacancy-grid">
        <article v-for="grupo in grupos" :key="grupo.title" class="vacancy-card">
          <div class="vacancy-top">
            <h2>{{ grupo.title }}</h2>
            <span v-if="grupo.vacancies > 0" class="vacancy-badge">
              {{ grupo.vacancies }} vacantes
            </span>
          </div>

          <ul class="vacancy-list">
            <li v-for="vacante in grupo.items" :key="vacante.id || vacante.titulo">
              <div class="vacancy-item">
                <span class="vacancy-item-title">{{ vacante.titulo }}</span>
                <button
                  class="vacancy-info-btn"
                  type="button"
                  @click="openDetalle(vacante)"
                >
                  Más info
                </button>
              </div>
            </li>
          </ul>

          <button class="btn btn-solid" type="button" @click="openPostula(grupo.items[0])">
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

    <!-- Modal detalle vacante -->
    <div
      v-if="detalleOpen"
      class="modal-backdrop"
      role="presentation"
      @click.self="closeDetalle"
    >
      <div
        class="vacante-detalle-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="detalleTitleId"
      >
        <button class="modal-close" type="button" aria-label="Cerrar" @click="closeDetalle">
          ✕
        </button>

        <div class="vacante-detalle-header">
          <h2 :id="detalleTitleId">{{ detalle?.titulo }}</h2>
          <span class="vacante-categoria-badge">{{ detalle?.categoria }}</span>
        </div>

        <p
          v-if="detalle?.mostrar_cantidad && detalle?.cantidad_vacantes > 0"
          class="vacante-cantidad-badge"
        >
          {{ detalle.cantidad_vacantes }}
          {{ detalle.cantidad_vacantes === 1 ? 'vacante disponible' : 'vacantes disponibles' }}
        </p>

        <div class="vacante-detalle-body">
          <p
            v-for="(parrafo, index) in detalleParrafos"
            :key="index"
            class="vacante-parrafo"
          >
            {{ parrafo }}
          </p>
          <p v-if="!detalleParrafos.length" class="vacante-parrafo muted">
            Sin descripción publicada para este cargo.
          </p>
        </div>

        <div class="vacante-detalle-actions">
          <button class="btn btn-outline" type="button" @click="closeDetalle">Cerrar</button>
          <button class="btn btn-solid" type="button" @click="postularDesdeDetalle">
            Postular a esta vacante
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal formulario postulación -->
    <div
      v-if="postulaOpen"
      class="modal-backdrop"
      role="presentation"
      @click.self="closePostula"
    >
      <form class="postula-modal" aria-label="Formulario de postulación" @submit.prevent="onSubmit">
        <button class="modal-close" type="button" aria-label="Cerrar" @click="closePostula">×</button>

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
            :value="form.rut"
            type="text"
            inputmode="text"
            autocomplete="off"
            placeholder="12.345.678-9"
            maxlength="12"
            required
            :disabled="loading"
            @input="onRutInput"
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
          <div class="phone-input">
            <span class="phone-prefix" aria-hidden="true">+56</span>
            <input
              id="postula-telefono"
              :value="form.telefono"
              type="tel"
              inputmode="numeric"
              autocomplete="tel-national"
              placeholder="9 xxxx xxxx"
              maxlength="11"
              required
              :disabled="loading"
              @input="onTelefonoInput"
            />
          </div>
        </div>

        <div class="field">
          <label for="postula-cargo">Cargo <span>*</span></label>
          <select
            id="postula-cargo"
            v-model="form.cargo"
            required
            :disabled="loading || cargoLocked"
          >
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

        <!-- Campo Honeypot (trampa para bots) -->
        <div class="hp-field" aria-hidden="true">
          <label for="website_hp">No llenar este campo</label>
          <input
            id="website_hp"
            v-model="form.website_hp"
            type="text"
            name="website_hp"
            tabindex="-1"
            autocomplete="off"
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
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { fetchVacantes, sendPostulacion } from '../api/publicForms'

const grupos = ref([])
const loadingVacantes = ref(false)
const vacantesError = ref('')

const allCargos = computed(() =>
  grupos.value.flatMap((grupo) => grupo.items.map((item) => item.titulo))
)

const detalleOpen = ref(false)
const detalle = ref(null)
const detalleTitleId = 'vacante-detalle-title'
const detalleParrafos = computed(() => {
  const raw = String(detalle.value?.descripcion || '').trim()
  if (!raw) return []
  return raw
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
})

const postulaOpen = ref(false)
const cargoLocked = ref(false)
const loading = ref(false)
const success = ref(false)
const error = ref('')
const cvFile = ref(null)
let closeTimer = null

const form = reactive({
  nombre: '',
  rut: '',
  email: '',
  telefono: '',
  cargo: '',
  website_hp: ''
})

function formatRut(value) {
  const clean = String(value || '')
    .replace(/[^0-9kK]/g, '')
    .toUpperCase()
    .slice(0, 9)

  if (!clean) return ''
  if (clean.length === 1) return clean

  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  const withDots = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${withDots}-${dv}`
}

function formatTelefono(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 9)
  if (!digits) return ''
  if (digits.length <= 1) return digits
  if (digits.length <= 5) return `${digits.slice(0, 1)} ${digits.slice(1)}`
  return `${digits.slice(0, 1)} ${digits.slice(1, 5)} ${digits.slice(5)}`
}

function onRutInput(event) {
  form.rut = formatRut(event.target.value)
  if (error.value) error.value = ''
}

function onTelefonoInput(event) {
  form.telefono = formatTelefono(event.target.value)
}

/** Valida RUT chileno con dígito verificador (módulo 11). */
function isValidRut(rut) {
  const clean = String(rut || '')
    .replace(/[^0-9kK]/g, '')
    .toUpperCase()

  if (clean.length < 2) return false

  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)

  if (!/^\d+$/.test(body) || body.length > 8) return false
  if (!/^[0-9K]$/.test(dv)) return false

  let sum = 0
  let multiplier = 2

  for (let i = body.length - 1; i >= 0; i -= 1) {
    sum += Number(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const remainder = 11 - (sum % 11)
  const expected = remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder)

  return dv === expected
}

function normalizeVacante(vacante, index) {
  const titulo = String(vacante.titulo || vacante.nombre || '').trim()
  if (!titulo) return null

  return {
    id: vacante.id || `${titulo}-${index}`,
    titulo,
    categoria: String(vacante.categoria || 'Otras vacantes').trim() || 'Otras vacantes',
    descripcion: String(vacante.descripcion || ''),
    cantidad_vacantes: Number(vacante.cantidad_vacantes) || 0,
    mostrar_cantidad: Boolean(vacante.mostrar_cantidad)
  }
}

function buildGrupos(vacantes) {
  const map = new Map()

  vacantes.forEach((raw, index) => {
    const vacante = normalizeVacante(raw, index)
    if (!vacante) return

    if (!map.has(vacante.categoria)) {
      map.set(vacante.categoria, {
        title: vacante.categoria,
        vacancies: 0,
        items: []
      })
    }

    const grupo = map.get(vacante.categoria)
    grupo.items.push(vacante)
    grupo.vacancies += vacante.cantidad_vacantes
  })

  return Array.from(map.values())
}

async function loadVacantes() {
  loadingVacantes.value = true
  vacantesError.value = ''
  try {
    const vacantes = await fetchVacantes()
    grupos.value = buildGrupos(vacantes)
  } catch (e) {
    console.error('Error cargando vacantes:', e)
    vacantesError.value = e.message || 'No se pudieron cargar las vacantes.'
    grupos.value = []
  } finally {
    loadingVacantes.value = false
  }
}

function clearCloseTimer() {
  if (closeTimer) {
    window.clearTimeout(closeTimer)
    closeTimer = null
  }
}

function openDetalle(vacante) {
  detalle.value = vacante
  detalleOpen.value = true
}

function closeDetalle() {
  detalleOpen.value = false
  detalle.value = null
}

function postularDesdeDetalle() {
  const vacante = detalle.value
  closeDetalle()
  if (vacante) openPostula(vacante)
}

function openPostula(vacante) {
  clearCloseTimer()
  success.value = false
  error.value = ''
  cvFile.value = null
  form.nombre = ''
  form.rut = ''
  form.email = ''
  form.telefono = ''
  form.cargo = vacante?.titulo || ''
  form.website_hp = ''
  cargoLocked.value = Boolean(vacante?.titulo)
  postulaOpen.value = true
}

function closePostula() {
  if (loading.value) return
  clearCloseTimer()
  postulaOpen.value = false
  cargoLocked.value = false
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
  // Honeypot: si un bot llenó el campo oculto, fingir éxito y no enviar.
  if (form.website_hp.trim()) {
    success.value = true
    error.value = ''
    closeTimer = window.setTimeout(() => {
      postulaOpen.value = false
      closeTimer = null
    }, 15000)
    return
  }

  if (!isValidRut(form.rut)) {
    error.value = 'El RUT ingresado no es válido. Revisa el número y el dígito verificador.'
    return
  }

  if (!cvFile.value) {
    error.value = 'Debes adjuntar tu CV en PDF.'
    return
  }

  loading.value = true
  success.value = false
  error.value = ''
  clearCloseTimer()

  try {
    const data = new FormData()
    const telefonoDigits = form.telefono.replace(/\D/g, '')
    data.append('nombre', form.nombre)
    data.append('rut', form.rut)
    data.append('email', form.email)
    data.append('telefono', telefonoDigits ? `+56${telefonoDigits}` : '')
    data.append('cargo', form.cargo)
    data.append('website_hp', form.website_hp)
    data.append('cv', cvFile.value)

    await sendPostulacion(data)
    success.value = true

    closeTimer = window.setTimeout(() => {
      postulaOpen.value = false
      closeTimer = null
    }, 15000)
  } catch (e) {
    error.value = e.message || 'No se pudo enviar la postulación.'
  } finally {
    loading.value = false
  }
}

function onKeydown(event) {
  if (event.key !== 'Escape') return
  if (detalleOpen.value) {
    closeDetalle()
    return
  }
  if (postulaOpen.value && !loading.value) closePostula()
}

onMounted(() => {
  loadVacantes()
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearCloseTimer()
})
</script>
