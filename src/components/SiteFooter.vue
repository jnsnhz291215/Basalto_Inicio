<template>
  <footer class="site-footer">
    <div class="container footer-brand">
      <div class="footer-brand-inner">
        <RouterLink class="footer-lockup" to="/" aria-label="Basalto Drilling">
          <span class="footer-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <g fill="#f47b20">
                <rect x="19" y="2" width="10" height="12" rx="2" transform="rotate(0 24 24)" />
                <rect x="19" y="2" width="10" height="12" rx="2" transform="rotate(45 24 24)" />
                <rect x="19" y="2" width="10" height="12" rx="2" transform="rotate(90 24 24)" />
                <rect x="19" y="2" width="10" height="12" rx="2" transform="rotate(135 24 24)" />
                <rect x="19" y="2" width="10" height="12" rx="2" transform="rotate(180 24 24)" />
                <rect x="19" y="2" width="10" height="12" rx="2" transform="rotate(225 24 24)" />
                <rect x="19" y="2" width="10" height="12" rx="2" transform="rotate(270 24 24)" />
                <rect x="19" y="2" width="10" height="12" rx="2" transform="rotate(315 24 24)" />
              </g>
            </svg>
          </span>
          <span class="footer-brand-text">
            <span class="footer-name">Basalto Drilling</span>
            <span class="footer-tag">Sondajes Mineros</span>
          </span>
        </RouterLink>

        <p class="footer-pitch">
          Soluciones robustas en perforación minera. Construyendo el futuro de la minería
          en Chile con precisión y seguridad.
        </p>
        <p class="footer-address">Antonio Bellet 193, Of. 302 - Providencia, Santiago</p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>© 2026 Basalto Drilling SpA. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
