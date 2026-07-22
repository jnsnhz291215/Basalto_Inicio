<template>
  <section class="hero">
    <div class="hero-glow" aria-hidden="true" />
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Servicios mineros · Chile</p>
        <h1>
          Precisión en<br />
          <span class="accent">Perforación</span> y<br />
          Sondajes Mineros
        </h1>
        <p class="hero-lead">
          Soluciones especializadas en sondaje diamantino, aire reverso e hidrogeología
          para la gran minería chilena. Potenciando la industria con tecnología de punta
          y seguridad operativa.
        </p>
        <div class="hero-actions">
          <RouterLink class="btn btn-solid" to="/contacto">
            Solicitar presupuesto
            <span aria-hidden="true">→</span>
          </RouterLink>
          <RouterLink class="btn btn-outline" to="/servicios">Nuestros servicios</RouterLink>
        </div>
      </div>

      <figure class="hero-media">
        <div
          class="hero-carousel"
          aria-roledescription="carrusel"
          aria-label="Faenas Basalto Drilling"
          @mouseenter="pause"
          @mouseleave="resume"
        >
          <div class="hero-carousel-track">
            <img
              v-for="(slide, index) in slides"
              :key="slide.src"
              :src="slide.src"
              :alt="slide.alt"
              class="hero-carousel-slide"
              :class="{ active: index === activeIndex }"
              width="768"
              height="1024"
            />
          </div>

          <button
            class="hero-carousel-nav prev"
            type="button"
            aria-label="Foto anterior"
            @click="prev"
          >
            ‹
          </button>
          <button
            class="hero-carousel-nav next"
            type="button"
            aria-label="Foto siguiente"
            @click="goNext"
          >
            ›
          </button>

          <div class="hero-carousel-dots" role="tablist" aria-label="Seleccionar foto">
            <button
              v-for="(slide, index) in slides"
              :key="slide.src"
              type="button"
              role="tab"
              :aria-selected="index === activeIndex"
              :aria-label="`Foto ${index + 1}`"
              :class="{ active: index === activeIndex }"
              @click="goTo(index)"
            />
          </div>
        </div>
        <figcaption>{{ slides[activeIndex].caption }}</figcaption>
      </figure>
    </div>

    <div class="container">
      <ul class="stats-bar" aria-label="Indicadores clave">
        <li v-for="stat in heroStats" :key="stat.label">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const slides = [
  {
    src: '/images/hero/hero-01.jpg',
    alt: 'Equipo de perforación Basalto Drilling',
    caption: 'Equipo Basalto — Perforación'
  },
  {
    src: '/images/hero/hero-02.jpg',
    alt: 'Perforadora en faena desértica',
    caption: 'Faena — Desierto de Atacama'
  },
  {
    src: '/images/hero/hero-03.jpg',
    alt: 'Operación de sondaje al atardecer',
    caption: 'Faena — Desierto de Atacama'
  },
  {
    src: '/images/hero/hero-04.jpg',
    alt: 'Equipo en terreno durante operación de sondaje',
    caption: 'Operación en terreno'
  }
]

const heroStats = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '50+', label: 'Profesionales' },
  { value: '2015', label: 'Año de fundación' },
  { value: '24/7', label: 'Operación en faena' }
]

const activeIndex = ref(0)
let timerId = null

function goTo(index) {
  activeIndex.value = index
  restart()
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % slides.length
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length
  restart()
}

function goNext() {
  next()
  restart()
}

function pause() {
  if (timerId) {
    window.clearInterval(timerId)
    timerId = null
  }
}

function resume() {
  pause()
  timerId = window.setInterval(next, 4500)
}

function restart() {
  resume()
}

onMounted(resume)
onBeforeUnmount(pause)
</script>
