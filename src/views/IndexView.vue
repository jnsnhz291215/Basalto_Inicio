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
        <img
          src="/images/hero-faena.png"
          alt="Equipo de perforación en faena minera al atardecer"
          width="1200"
          height="675"
        />
        <figcaption>Faena — Desierto de Atacama</figcaption>
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
import { RouterLink } from 'vue-router'

const heroStats = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '50+', label: 'Profesionales' },
  { value: '2015', label: 'Año de fundación' },
  { value: '24/7', label: 'Operación en faena' }
]
</script>
