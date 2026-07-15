<template>
  <section class="tabs-section" aria-labelledby="corporate-tabs-title">
    <div class="section-heading">
      <span class="eyebrow">Portal corporativo</span>
      <h2 id="corporate-tabs-title">Información institucional</h2>
      <p>Contenido base para presentar la organización, sus servicios y oportunidades de postulación.</p>
    </div>

    <div class="tabs-nav" role="tablist" aria-label="Secciones corporativas">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <article class="tab-panel">
      <div class="tab-copy">
        <span class="eyebrow">{{ currentTab.kicker }}</span>
        <h3>{{ currentTab.title }}</h3>
        <p>{{ currentTab.description }}</p>
      </div>

      <div class="info-grid">
        <div v-for="card in currentTab.cards" :key="card.title" class="info-card">
          <span class="card-number">{{ card.number }}</span>
          <h4>{{ card.title }}</h4>
          <p>{{ card.text }}</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const tabs = [
  {
    id: 'quienes-somos',
    label: 'Quiénes Somos',
    kicker: 'Identidad Basalto',
    title: 'Una operación preparada para desafíos de alto estándar',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, justo sed porttitor gravida, lorem urna luctus sem, vitae faucibus magna lectus et sem.',
    cards: [
      {
        number: '01',
        title: 'Cultura operacional',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere mantiene foco en seguridad, continuidad y disciplina operacional.'
      },
      {
        number: '02',
        title: 'Gestión trazable',
        text: 'Praesent commodo, magna vel consequat posuere, permite ordenar información crítica para equipos en terreno y administración.'
      },
      {
        number: '03',
        title: 'Equipo especialista',
        text: 'Mauris at sem vitae arcu luctus congue. Nuestra maqueta destaca experiencia, coordinación y soporte continuo.'
      }
    ]
  },
  {
    id: 'servicios',
    label: 'Nuestros Servicios',
    kicker: 'Capacidades',
    title: 'Servicios integrados para perforación y soporte operativo',
    description: 'Donec faucibus mi et turpis tempor, at ullamcorper nibh consequat. Nulla facilisi. La estructura permite destacar líneas de servicio con lectura rápida.',
    cards: [
      {
        number: 'A',
        title: 'Perforación especializada',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maquinaria, planificación y control para faenas exigentes.'
      },
      {
        number: 'B',
        title: 'Gestión de turnos',
        text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; control simple y seguro.'
      },
      {
        number: 'C',
        title: 'Rendiciones y soporte',
        text: 'Curabitur tempor, nibh non consequat ultrices, entrega una base visual para procesos administrativos conectados.'
      }
    ]
  },
  {
    id: 'postulaciones',
    label: 'Trabaja con Nosotros',
    kicker: 'Postulaciones',
    title: 'Un espacio para sumar talento a Basalto Drilling',
    description: 'Aliquam erat volutpat. Este bloque deja preparada una sección para comunicar vacantes, beneficios y requisitos de ingreso.',
    cards: [
      {
        number: 'CV',
        title: 'Envía tus antecedentes',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adjunta experiencia, certificaciones y disponibilidad.'
      },
      {
        number: 'RH',
        title: 'Proceso transparente',
        text: 'Integer vitae diam eget ipsum placerat facilisis. Etapas claras para revisión, entrevistas y validación documental.'
      },
      {
        number: 'ON',
        title: 'Ingreso acompañado',
        text: 'Suspendisse potenti. Onboarding operativo, inducciones y acceso a herramientas digitales de la compañía.'
      }
    ]
  }
]

const activeTab = ref(tabs[0].id)

const currentTab = computed(() => (
  tabs.find((tab) => tab.id === activeTab.value) || tabs[0]
))
</script>
