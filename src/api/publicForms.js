const PUBLIC_API_BASE = (
  import.meta.env.VITE_PUBLIC_API_BASE_URL || 'https://turnos.basalto.app'
).replace(/\/$/, '')

async function parseJson(res) {
  try {
    return await res.json()
  } catch {
    return null
  }
}

export async function sendContacto(payload) {
  const res = await fetch(`${PUBLIC_API_BASE}/api/public/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  })
  const data = await parseJson(res)
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || 'No se pudo enviar el mensaje.')
  }
  return data
}

export async function sendPostulacion(formData) {
  const res = await fetch(`${PUBLIC_API_BASE}/api/public/postulaciones`, {
    method: 'POST',
    body: formData
  })
  const data = await parseJson(res)
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || 'No se pudo enviar la postulación.')
  }
  return data
}

export async function fetchVacantes() {
  const res = await fetch(`${PUBLIC_API_BASE}/api/public/vacantes`, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  })
  const data = await parseJson(res)
  if (!res.ok) {
    throw new Error(data?.message || 'No se pudieron cargar las vacantes.')
  }
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.vacantes)) return data.vacantes
  return []
}
