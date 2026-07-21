<template>
  <section class="page-section">
    <div class="container page-header">
      <p class="eyebrow">Proyectos</p>
      <h1>Presencia en faenas de alto estándar</h1>
      <p class="page-lead">
        Acompañamos operaciones mineras con equipos especializados, planificación rigurosa
        y respuesta permanente en terreno.
      </p>
    </div>

    <div class="container projects-grid">
      <article v-for="project in projects" :key="project.title" class="project-card">
        <p class="project-region">{{ project.region }}</p>
        <h2>{{ project.title }}</h2>
        <p>{{ project.text }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    region: 'Antofagasta',
    title: 'Exploración diamantina',
    text: 'Campañas de sondaje para caracterización geológica en operaciones de gran minería.'
  },
  {
    region: 'Atacama',
    title: 'Control de leyes',
    text: 'Perforación de precisión para soporte de planificación minera y control de mineral.'
  },
  {
    region: 'Tarapacá',
    title: 'Monitoreo hidrogeológico',
    text: 'Sondajes orientados a seguimiento hídrico y continuidad operacional en faena.'
  }
]
</script>
