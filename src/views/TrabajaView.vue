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

          <a class="btn btn-solid" :href="mailtoHref(role.title)">
            Postular
            <span aria-hidden="true">→</span>
          </a>
        </article>
      </div>

      <p class="trabaja-contact">
        También puedes escribirnos directamente a
        <a href="mailto:postulaciones@basaltodrilling.cl">postulaciones@basaltodrilling.cl</a>
      </p>
    </div>
  </section>
</template>

<script setup>
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

function mailtoHref(roleTitle) {
  const subject = encodeURIComponent(`Postulación — ${roleTitle}`)
  return `mailto:postulaciones@basaltodrilling.cl?subject=${subject}`
}
</script>
