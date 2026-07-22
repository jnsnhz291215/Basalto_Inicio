<template>
  <div class="servicios-page">
    <section class="servicios-block">
      <div class="container">
        <header class="servicios-header">
          <p class="eyebrow">Servicios</p>
          <h1>Nuestros Servicios</h1>
          <p class="servicios-lead">
            Capacidades técnicas especializadas para cada etapa de la exploración y explotación minera,
            con equipos modernos y personal certificado.
          </p>
        </header>

        <div class="service-cards">
          <article v-for="service in services" :key="service.title" class="service-card tarjeta-servicio">
            <span class="service-icon" aria-hidden="true" v-html="service.icon" />
            <h2>{{ service.title }}</h2>
            <p>{{ service.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="servicios-block why-block">
      <div class="container">
        <header class="servicios-header">
          <p class="eyebrow">¿Por qué nosotros?</p>
          <h1>Por Qué Elegirnos</h1>
          <p class="servicios-lead">
            Más de una década apoyando a la gran minería chilena con los más altos estándares
            de seguridad, tecnología y desempeño operativo.
          </p>
        </header>

        <ul class="why-grid">
          <li v-for="item in reasons" :key="item.title">
            <span class="why-icon" aria-hidden="true" v-html="item.icon" />
            <h2>{{ item.title }}</h2>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
const iconDrill = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`

const iconFunnel = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16l-6 8v6l-4 2v-8L4 4z"/></svg>`

const iconDrop = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7c.4.5 7 8.1 7 12.3a7 7 0 1 1-14 0C5 10.8 11.6 3.2 12 2.7z"/><path d="M12 16.5a2.5 2.5 0 0 0 0-5"/></svg>`

const iconHelmet = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a8 8 0 0 1 16 0"/><path d="M2 18h20"/><path d="M12 6v2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>`

const iconShield = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9.5C7.5 20.5 4 17 4 12V6l8-3z"/><path d="m9 12 2 2 4-4"/></svg>`

const iconGear = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/><path d="m10 12 1.2 1.2L14.5 10"/></svg>`

const iconCompass = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="m8 8 2.5 5.5L16 16l-2.5-5.5L8 8z"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>`

const iconMap = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3 6.5v13L9 17l6 2.5L21 17V4l-6 2.5L9 4z"/><path d="M9 4v13M15 6.5v13"/></svg>`

const services = [
  {
    title: 'Sondajes Diamantinos',
    text: 'Perforación en superficie e interior mina, con foco en recuperación de testigos para análisis geológico.',
    icon: iconDrill
  },
  {
    title: 'Aire Reverso (RC)',
    text: 'Perforación rápida para obtener muestras de detritos en proyectos de exploración avanzada.',
    icon: iconFunnel
  },
  {
    title: 'Hidrogeología',
    text: 'Construcción y diseño de pozos de agua y monitoreo hidrogeológico para operaciones mineras.',
    icon: iconDrop
  },
  {
    title: 'Geotécnicos',
    text: 'Perforaciones orientadas y ensayos in situ para caracterización del macizo rocoso y diseño estructural.',
    icon: iconHelmet
  }
]

const reasons = [
  {
    title: 'Seguridad Operacional',
    text: 'Cero daño como prioridad fundamental.',
    icon: iconShield
  },
  {
    title: 'Equipos de Vanguardia',
    text: 'Flota moderna incluyendo DR40XHD.',
    icon: iconGear
  },
  {
    title: 'Personal Certificado',
    text: 'Operadores altamente calificados.',
    icon: iconCompass
  },
  {
    title: 'Cobertura Nacional',
    text: 'Presencia en todo el territorio chileno.',
    icon: iconMap
  }
]
</script>
