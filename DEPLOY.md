# Deploy — Basalto Inicio

Desde la carpeta del proyecto (`Basalto_Inicio`):

```bash
cd /ruta/a/Basalto_Inicio
```

## Activar indexación (Google puede indexar)

```bash
VITE_PUBLIC_INDEXING=true npm run build && pm2 restart basalto_inicio
```

## Desactivar indexación (ocultar de Google)

```bash
VITE_PUBLIC_INDEXING=false npm run build && pm2 restart basalto_inicio
```

## Solo rebuild + reiniciar PM2 (sin tocar el switch)

Usa el valor que ya esté en `.env` (`VITE_PUBLIC_INDEXING`):

```bash
npm run build && pm2 restart basalto_inicio
```

## Flujo completo después de un `git pull`

```bash
git pull
npm install
VITE_PUBLIC_INDEXING=true npm run build
pm2 restart basalto_inicio
```

> Cambia `true` por `false` si quieres mantener la página sin indexar.  
> Si `VITE_PUBLIC_INDEXING` ya está en el `.env` del servidor, basta con `npm run build && pm2 restart basalto_inicio`.
