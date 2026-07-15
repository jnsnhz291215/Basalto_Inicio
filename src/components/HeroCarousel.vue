<template>
  <section class="hero-carousel" aria-label="Presentación corporativa">
    <article
      v-for="(slide, index) in slides"
      :key="slide.title"
      class="hero-slide"
      :class="{ active: index === activeIndex }"
      :style="{ backgroundImage: `linear-gradient(90deg, rgba(8, 9, 10, 0.88), rgba(8, 9, 10, 0.34)), url(${slide.image})` }"
    >
      <div class="hero-content">
        <span class="eyebrow">{{ slide.kicker }}</span>
        <h1>{{ slide.title }}</h1>
        <p>{{ slide.description }}</p>
      </div>
    </article>

    <div class="hero-controls" aria-label="Controles del carrusel">
      <button
        v-for="(slide, index) in slides"
        :key="slide.title"
        type="button"
        :class="{ active: index === activeIndex }"
        :aria-label="`Ver slide ${index + 1}`"
        @click="setActive(index)"
      />
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const slides = [
  {
    kicker: 'Operación en terreno',
    title: 'Basalto Drilling: Innovación y liderazgo en terreno',
    description: 'Coordinamos personas, turnos y procesos críticos con una experiencia digital segura y unificada.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=80'
  },
  {
    kicker: 'Tecnología de vanguardia',
    title: 'Datos confiables para decisiones operacionales',
    description: 'Una plataforma pensada para sostener continuidad, trazabilidad y control en cada frente de trabajo.',
    image: 'https://images.unsplash.com/photo-1581091870622-1e7e3f71f6d6?auto=format&fit=crop&w=1800&q=80'
  },
  {
    kicker: 'Minería y perforación',
    title: 'Excelencia operacional con foco en seguridad',
    description: 'Procesos simples, información disponible y acceso seguro para cada equipo de Basalto Drilling.',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1800&q=80'
  },
  {
    kicker: 'Gestión integrada',
    title: 'Un ecosistema conectado bajo basalto.app',
    description: 'Inicio, Rendiciones y Turnos trabajan con una sesión compartida para reducir fricción y mejorar control.',
    image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=1800&q=80'
  }
]

const activeIndex = ref(0)
let intervalId = null

function setActive(index) {
  activeIndex.value = index
}

onMounted(() => {
  intervalId = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.length
  }, 5500)
})

onBeforeUnmount(() => {
  if (intervalId) window.clearInterval(intervalId)
})
</script>
