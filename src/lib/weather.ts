// Datos meteorológicos para Plaza de Armas de La Serena (-29.9027, -71.2519)
// Se obtienen en el servidor (Workers) y se cachean en memoria del módulo + caché de fetch de Cloudflare.

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2519' +
  '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max' +
  '&timezone=America%2FSantiago&forecast_days=7';

interface WeatherData {
  current?: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
    wind_speed_10m_max: number[];
  };
}

const TTL = 30 * 60 * 1000;
let cache: WeatherData | null = null;
let cacheTime = 0;

export async function getWeather(): Promise<WeatherData | null> {
  if (cache && Date.now() - cacheTime < TTL) return cache;
  try {
    const res = await fetch(WEATHER_URL, {
      cf: { cacheTtl: 1800, cacheEverything: true }
    } as RequestInit & { cf: { cacheTtl: number; cacheEverything: boolean } });
    if (!res.ok) throw new Error(`weather http ${res.status}`);
    const data = (await res.json()) as WeatherData;
    if (!data.current || !data.daily) throw new Error('weather shape');
    cache = data;
    cacheTime = Date.now();
    return data;
  } catch {
    // Si falla la petición, se devuelve la última copia válida (stale) si existe.
    return cache;
  }
}

export function weatherText(code: number): string {
  if (code === 0) return 'Despejado';
  if (code === 1 || code === 2) return 'Parcialmente nublado';
  if (code === 3) return 'Nublado';
  if (code === 45 || code === 48) return 'Niebla / camanchaca';
  if (code >= 51 && code <= 57) return 'Llovizna';
  if (code >= 61 && code <= 67) return 'Lluvia';
  if (code >= 71 && code <= 77) return 'Nieve';
  if (code >= 80 && code <= 82) return 'Chubascos';
  if (code >= 85 && code <= 86) return 'Chubascos de nieve';
  if (code >= 95) return 'Tormenta';
  return 'Variable';
}

export function weatherGlyph(code: number): string {
  if (code === 0) return '☀';
  if (code === 1 || code === 2) return '⛅';
  if (code === 3) return '☁';
  if (code === 45 || code === 48) return '≋';
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return '☂';
  if ((code >= 71 && code <= 77) || code >= 85) return '❄';
  if (code >= 95) return '⚡';
  return '○';
}

// ¿Hace falta paraguas? Umbral: probabilidad de precipitación del día o lluvia actual.
export function umbrellaAdvice(data: WeatherData): string {
  const currentRain = data.current?.precipitation ?? 0;
  const probs = data.daily?.precipitation_probability_max ?? [];
  const todayProb = probs.length ? probs[0] : 0;
  if (currentRain > 0 || todayProb >= 50) {
    return 'Sí: hoy conviene llevar paraguas o chaqueta impermeable.';
  }
  if (todayProb >= 25) {
    return 'Probabilidades bajas: un paraguas plegable no está de más.';
  }
  return 'No: no necesitarás paraguas, el pronóstico se mantiene seco.';
}

export function uvAdvice(uv: number): string {
  if (uv < 3) return 'Baja';
  if (uv < 6) return 'Moderada';
  if (uv < 8) return 'Alta';
  if (uv < 11) return 'Muy alta';
  return 'Extrema';
}

export function formatHour(iso: string): string {
  try {
    return new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Santiago' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function weekdayShort(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('es-CL', { weekday: 'short' }).format(new Date(`${dateStr}T12:00:00`));
  } catch {
    return dateStr;
  }
}

export function dayNumber(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short' }).format(new Date(`${dateStr}T12:00:00`));
  } catch {
    return dateStr;
  }
}
