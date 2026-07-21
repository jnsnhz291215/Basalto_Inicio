<template>
  <section class="nosotros-page">
    <div class="container nosotros-grid">
      <div class="nosotros-copy">
        <p class="eyebrow">Nosotros</p>
        <h1>Nuestra Misión</h1>
        <p class="nosotros-lead">
          Basalto Drilling provee servicios de sondaje de alta calidad, priorizando seguridad,
          medio ambiente y excelencia técnica. Fundada en 2015, opera como socio estratégico
          de la minería chilena.
        </p>

        <hr class="nosotros-divider" />

        <ul class="nosotros-stats">
          <li v-for="stat in stats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </li>
        </ul>
      </div>

      <figure class="nosotros-media">
        <img
          src="/images/nosotros-equipo.png"
          alt="Equipo de Basalto Drilling en faena"
          width="900"
          height="675"
        />
      </figure>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '50+', label: 'Profesionales' },
  { value: '2015', label: 'Año de fundación' }
]
</script>
