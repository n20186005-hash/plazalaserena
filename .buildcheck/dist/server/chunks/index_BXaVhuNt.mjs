globalThis.process ??= {};
globalThis.process.env ??= {};
import { t as __exportAll } from "./rolldown-runtime_D7vh-g_o.mjs";
import { d as renderHead, f as addAttribute, l as renderTemplate, v as unescapeHTML, x as createAstro } from "./server_CMslVnDj.mjs";
import { t as createComponent } from "./compiler_B74dw_-v.mjs";
//#region src/lib/weather.ts
var WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2519&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max&timezone=America%2FSantiago&forecast_days=7";
var TTL = 18e5;
var cache = null;
var cacheTime = 0;
async function getWeather() {
	if (cache && Date.now() - cacheTime < TTL) return cache;
	try {
		const res = await fetch(WEATHER_URL, { cf: {
			cacheTtl: 1800,
			cacheEverything: true
		} });
		if (!res.ok) throw new Error(`weather http ${res.status}`);
		const data = await res.json();
		if (!data.current || !data.daily) throw new Error("weather shape");
		cache = data;
		cacheTime = Date.now();
		return data;
	} catch {
		return cache;
	}
}
function weatherText(code) {
	if (code === 0) return "Despejado";
	if (code === 1 || code === 2) return "Parcialmente nublado";
	if (code === 3) return "Nublado";
	if (code === 45 || code === 48) return "Niebla / camanchaca";
	if (code >= 51 && code <= 57) return "Llovizna";
	if (code >= 61 && code <= 67) return "Lluvia";
	if (code >= 71 && code <= 77) return "Nieve";
	if (code >= 80 && code <= 82) return "Chubascos";
	if (code >= 85 && code <= 86) return "Chubascos de nieve";
	if (code >= 95) return "Tormenta";
	return "Variable";
}
function weatherGlyph(code) {
	if (code === 0) return "☀";
	if (code === 1 || code === 2) return "⛅";
	if (code === 3) return "☁";
	if (code === 45 || code === 48) return "≋";
	if (code >= 51 && code <= 57 || code >= 61 && code <= 67 || code >= 80 && code <= 82) return "☂";
	if (code >= 71 && code <= 77 || code >= 85) return "❄";
	if (code >= 95) return "⚡";
	return "○";
}
function umbrellaAdvice(data) {
	const currentRain = data.current?.precipitation ?? 0;
	const probs = data.daily?.precipitation_probability_max ?? [];
	const todayProb = probs.length ? probs[0] : 0;
	if (currentRain > 0 || todayProb >= 50) return "Sí: hoy conviene llevar paraguas o chaqueta impermeable.";
	if (todayProb >= 25) return "Probabilidades bajas: un paraguas plegable no está de más.";
	return "No: no necesitarás paraguas, el pronóstico se mantiene seco.";
}
function uvAdvice(uv) {
	if (uv < 3) return "Baja";
	if (uv < 6) return "Moderada";
	if (uv < 8) return "Alta";
	if (uv < 11) return "Muy alta";
	return "Extrema";
}
function formatHour(iso) {
	try {
		return new Intl.DateTimeFormat("es-CL", {
			hour: "2-digit",
			minute: "2-digit",
			timeZone: "America/Santiago"
		}).format(new Date(iso));
	} catch {
		return iso;
	}
}
function weekdayShort(dateStr) {
	try {
		return new Intl.DateTimeFormat("es-CL", { weekday: "short" }).format(/* @__PURE__ */ new Date(`${dateStr}T12:00:00`));
	} catch {
		return dateStr;
	}
}
function dayNumber(dateStr) {
	try {
		return new Intl.DateTimeFormat("es-CL", {
			day: "numeric",
			month: "short"
		}).format(/* @__PURE__ */ new Date(`${dateStr}T12:00:00`));
	} catch {
		return dateStr;
	}
}
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://plazalaserena.com");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const siteUrl = Astro.site?.toString().replace(/\/$/, "");
	const canonical = siteUrl ? `${siteUrl}${Astro.url.pathname}` : Astro.url.pathname;
	const hero = "/images/catedral-la-serena.jpg";
	const fullName = "Plaza de Armas de La Serena";
	const shortName = "Plaza de La Serena";
	const mapsShareUrl = "https://maps.app.goo.gl/S86UaHnHk74oNaA87";
	const mapsEmbedSrc = "https://www.google.com/maps?q=Plaza+de+Armas+de+La+Serena,+La+Serena,+Regi%C3%B3n+de+Coquimbo,+Chile&z=16&output=embed&hl=es&region=CL";
	const govtTourismUrl = "https://www.laserena.cl";
	const ratingValue = "4,5";
	const ratingCount = "14.226";
	const syncDate = "septiembre de 2026";
	const attractions = [
		{
			title: "Catedral y centro histórico",
			text: "Piedra, iglesias y fachadas neocoloniales alrededor de la Plaza de Armas de La Serena, el corazón antiguo de la ciudad y punto de partida de todo recorrido.",
			image: "/images/catedral-la-serena.jpg",
			alt: "Catedral de La Serena junto a la Plaza de La Serena"
		},
		{
			title: "Faro Monumental",
			text: "El ícono de la costanera a pocos minutos de la plaza: una torre de hormigón frente al Pacífico, perfecta para caminar cuando baja la luz.",
			image: "/images/faro-monumental.jpg",
			alt: "Faro Monumental de La Serena cerca de la Plaza de La Serena"
		},
		{
			title: "Cielo del Elqui",
			text: "A poca distancia, el valle abre una de las grandes puertas astronómicas de Chile: noches secas, oscuras y nítidas para cerrar el día.",
			image: "/images/playa-la-serena.jpg",
			alt: "Costa y playa de La Serena a poca distancia de la Plaza de La Serena"
		}
	];
	const timeline = [
		{
			year: "1544",
			title: "Fundación de Villanueva de La Serena",
			text: "El capitán Juan Bohón, por orden de Pedro de Valdivia, funda la ciudad en el valle junto al mar. Nace con ella la plaza, trazada según el damero clásico hispano como centro de la vida cívica."
		},
		{
			year: "1549",
			title: "Refundación y nombre actual",
			text: "Tras el alzamiento de enero de 1549 que destruye el asentamiento, Pedro de Valdivia la refunda como San Bartolomé de La Serena. La tradición atribuye el nombre a la serenidad de sus noches y aguas tranquilas."
		},
		{
			year: "1680",
			title: "El saqueo corsario",
			text: "El corsario Bartholomew Sharp saquea la villa colonial. La historia local cuenta que los vecinos reunieron un rescate en plata y que parte del botín nunca se recuperó: nace así una de las leyendas de tesoros perdidos del Norte Chico."
		},
		{
			year: "1948",
			title: "Plan Serena",
			text: "El presidente Gabriel González Videla, hijo de la ciudad, impulsa la restauración neocolonial del centro: piedra tallada, galerías y la silueta de templos que hoy enmarcan la plaza, declarada parte del casco histórico."
		},
		{
			year: "Hoy",
			title: "Plaza de la Ciudadanía",
			text: "Fuentes, palmeras y eventos cívicos conviven con cafés, artesanos y paseantes. Es el salón público de la ciudad y la parada natural de todo visitante."
		}
	];
	const seasons = [
		{
			season: "Verano (dic–feb)",
			clima: "Días templados y soleados, mañanas con camanchaca que se disipa hacia mediodía; brisa costera constante.",
			visitors: "Alto — temporada alta de vacaciones en Chile",
			highlight: "Atardeceres largos y vida costera; reserva alojamiento con anticipación."
		},
		{
			season: "Otoño (mar–may)",
			clima: "Templado y estable, menos niebla matinal; noches frescas.",
			visitors: "Medio-bajo — ciudad más tranquila",
			highlight: "Luz suave para fotografía y paseos por el centro sin multitudes."
		},
		{
			season: "Invierno (jun–ago)",
			clima: "Fresco (8–17 °C), escasas lluvias; tras los frentes, cielos excepcionalmente limpios.",
			visitors: "Bajo — temporada baja",
			highlight: "La mejor época para astronomía: aire seco y transparente tras el paso de frentes."
		},
		{
			season: "Primavera (sep–nov)",
			clima: "Agradable con vientos ocasionales; si llovió en invierno, el desierto florece alrededor.",
			visitors: "Medio — retorno gradual de visitantes",
			highlight: "Floración del desierto en los alrededores y días largos para recorrer la costa."
		}
	];
	const audienceRoutes = [
		{
			icon: "✿",
			title: "Familias con niños",
			text: "Recorrido plano y sombreado por la plaza, con paradas cortas: fuentes y esculturas para observar, un museo cercano con visitas breves y una pausa de helado bajo las galerías. Baños y agua potable en el perímetro; ritmo flexible y bancas en cada tramo.",
			tips: "Lleva bloqueador, gorros y agua: el sol de mediodía es intenso incluso con frescura matinal."
		},
		{
			icon: "◎",
			title: "Fotografía y naturaleza",
			text: "Amanecer con camanchaca envolviendo las torres de piedra, luz dorada de atardecer en las fachadas neocoloniales y cielos nocturnos de clase mundial a poca distancia. La plaza concentra arquitectura, sombras y texturas en pocos pasos.",
			tips: "La hora azul tras la puesta de sol es ideal para fachadas iluminadas; un trípode ligero basta."
		},
		{
			icon: "⌘",
			title: "Movilidad reducida / bajo esfuerzo",
			text: "Plaza llana con pisos nivelados y abundantes bancas; recorrido peatonal compacto en el que se puede avanzar por tramos y descansar. El centro histórico se recorre casi por completo sin desniveles significativos.",
			tips: "Prioriza la mañana, cuando hay menos gente y más sombra; los principales edificios tienen accesos habilitados."
		}
	];
	const itineraries = [{
		label: "Medio día",
		title: "Centro histórico esencial",
		text: "1) Plaza de Armas y sus fuentes. 2) Catedral de La Serena y templos del entorno inmediato. 3) Paseo por las galerías neocoloniales del casco histórico. 4) Cierre en el mercado artesanal del centro. Ritmo tranquilo, casi todo a pie y sin desniveles.",
		note: "Ideal para escalas o primeros contactos con la ciudad."
	}, {
		label: "Día completo",
		title: "De la plaza al Pacífico",
		text: "1) Mañana en la plaza, Catedral y museos del centro. 2) Almuerzo de cocina marina en el casco histórico. 3) Tarde por la avenida costera hasta el Faro Monumental y las playas del sector. 4) Atardecer en la costanera y, si el cielo acompaña, una mirada a las estrellas para cerrar el día.",
		note: "Combina patrimonio, costa y cielo en un solo recorrido circular."
	}];
	const services = [
		{
			icon: "⌂",
			title: "Baños y agua potable",
			text: "Baños públicos en el perímetro del centro y baños de cafeterías, museos y edificios públicos de la zona; bebederos y tiendas para reponer agua durante el paseo."
		},
		{
			icon: "▣",
			title: "Estacionamiento",
			text: "Estacionamientos subterráneos y concesionados del centro, más calles con estacionamiento medido; en temporada alta conviene llegar temprano o moverse a pie."
		},
		{
			icon: "✦",
			title: "Gastronomía",
			text: "Restaurantes de pescados y mariscos, cafés y repostería, comida rápida y cocina regional del valle: tipos de locales variados en el casco histórico y la costanera."
		},
		{
			icon: "⌁",
			title: "Alojamiento",
			text: "Hoteles, hostales, apart hoteles y camping en el sector costero; la oferta se concentra entre el centro y la avenida del mar, en todos los rangos de presupuesto."
		},
		{
			icon: "◍",
			title: "Compras y abastecimiento",
			text: "Supermercados, farmacias, ferias libres y mercados artesanales para provisiones, snack y recuerdos; la mayoría dentro del anillo céntrico."
		},
		{
			icon: "⚡",
			title: "Combustible y carga eléctrica",
			text: "Bencineras y puntos de carga para vehículos eléctricos en las avenidas principales de acceso al centro; suficiente cobertura para recorrer la ciudad y el valle."
		},
		{
			icon: "◎",
			title: "Cajeros y dinero",
			text: "Cajeros automáticos de bancos y redes en el centro; tarjetas aceptadas en la mayoría de los locales, con efectivo útil para ferias y transporte local."
		},
		{
			icon: "≈",
			title: "Conectividad",
			text: "Cobertura móvil completa en el centro, wifi en cafeterías y espacios públicos; suficiente para navegar mapas y consultar horarios en el recorrido."
		}
	];
	const responsibilities = [
		{
			icon: "◈",
			title: "Patrimonio frágil",
			text: "La plaza y sus templos son patrimonio de casi cinco siglos: no trepar a fuentes, fachadas ni estructuras, y seguir las indicaciones en edificios de valor histórico."
		},
		{
			icon: "◡",
			title: "Agua y desierto",
			text: "La región es semiárida: usa el agua con moderación y evita el desperdicio en un entorno donde cada gota cuenta."
		},
		{
			icon: "✷",
			title: "Cielos oscuros",
			text: "La calidad astronómica de la región es un bien común: preferir iluminación cálida y apagar luces innecesarias ayuda a proteger uno de los cielos más limpios del planeta."
		},
		{
			icon: "☾",
			title: "Fauna urbana",
			text: "Observa aves y fauna urbana sin alimentarlas ni molestarlas; la basura, a los basureros, para mantener limpia la plaza y sus alrededores."
		},
		{
			icon: "✚",
			title: "Templos activos",
			text: "Los templos que rodean la plaza están vivos: respeta los horarios de culto, guarda silencio en su interior y sigue las normas de visita de cada comunidad."
		},
		{
			icon: "△",
			title: "Sol y clima",
			text: "Radiación UV alta durante el día y noches frescas: bloqueador, gorro y una capa abrigadora, incluso cuando la camanchaca oculte el sol."
		}
	];
	const faqs = [
		["¿Dónde está la Plaza de Armas de La Serena?", "La Plaza de Armas de La Serena se encuentra en el centro histórico de La Serena, Región de Coquimbo, Chile, rodeada por la Catedral de La Serena y los principales edificios públicos de la ciudad."],
		["¿La entrada a la Plaza de La Serena es gratuita?", "Sí. La Plaza de Armas de La Serena es un parque urbano de acceso público y gratuito, visitable durante todo el año."],
		["¿Cuál es el horario de la Plaza de Armas de La Serena?", "Como espacio público, la plaza permanece accesible de día y de noche durante todo el año. Los museos y edificios que la rodean tienen horarios propios que conviene verificar localmente."],
		["¿Qué ver alrededor de la Plaza de Armas de La Serena?", "A pocos pasos están la Catedral de La Serena y la Iglesia San Francisco; el Faro Monumental, la Avenida del Mar y la Recova completan el recorrido por el centro y la costa."],
		["¿Cuál es la mejor época para visitar La Serena?", "El verano ofrece más días de playa; otoño y primavera suelen ser agradables para combinar la plaza, el centro histórico, la costa y excursiones al valle. El invierno destaca por los cielos limpios, ideales para la astronomía."],
		["¿El clima en la Plaza de La Serena cambia mucho durante el día?", "Sí. Es normal que la mañana comience con camanchaca (niebla costera) y frescura, que el mediodía se abra soleado y templado y que la noche vuelva a refrescar con brisa marina. Conviene venir con capas de ropa."],
		["¿La plaza es accesible para personas con movilidad reducida?", "Sí. La plaza es plana, con pisos nivelados y abundantes bancas; el centro histórico se recorre prácticamente sin desniveles y los principales edificios del entorno cuentan con accesos habilitados."],
		["¿Hay baños, estacionamiento y lugares para comer cerca de la plaza?", "Sí: en el centro hay baños públicos y en cafeterías y museos, estacionamientos subterráneos y concesionados, además de restaurantes, cafés y supermercados en el anillo céntrico."],
		["¿Cuánto tiempo conviene quedarse?", "Un día permite conocer la Plaza de Armas, la Catedral y el centro. Dos días suman el Faro y la Avenida del Mar; una noche extra abre la ruta del Valle del Elqui y la observación de estrellas."],
		["¿Se puede llegar sin auto?", "Sí. La plaza está en pleno centro peatonal de La Serena, con buses interurbanos, taxis colectivos y transporte urbano; para el Valle del Elqui resulta más práctico contratar una excursión o revisar los horarios de buses."]
	];
	const weather = await getWeather();
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "TouristAttraction",
		"@id": siteUrl ? `${siteUrl}/#attraction` : "#attraction",
		name: fullName,
		alternateName: [
			shortName,
			"Plaza de la Ciudadanía de La Serena",
			`La Serena ${fullName}`
		],
		description: `Comprehensive visitor guide to ${fullName} in La Serena, Región de Coquimbo, Chile.`,
		url: siteUrl ? `${siteUrl}/` : void 0,
		image: siteUrl ? [`${siteUrl}${hero}`] : [hero],
		isAccessibleForFree: true,
		address: {
			"@type": "PostalAddress",
			streetAddress: fullName,
			addressLocality: "La Serena",
			addressRegion: "Región de Coquimbo",
			postalCode: "1700000",
			addressCountry: "CL"
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: -29.9026731,
			longitude: -71.2519326
		},
		hasMap: mapsShareUrl,
		sameAs: [mapsShareUrl, govtTourismUrl]
	};
	const faqLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map(([q, a]) => ({
			"@type": "Question",
			name: q,
			acceptedAnswer: {
				"@type": "Answer",
				text: a
			}
		}))
	};
	const breadcrumb = [
		fullName,
		"La Serena",
		"Región de Coquimbo",
		"Chile"
	];
	return renderTemplate`<html lang="es-CL"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Plaza de Armas de La Serena (La Serena) - Guía del visitante y ubicación</title><meta name="description" content="Descubre la Plaza de Armas de La Serena, el icónico punto de referencia de La Serena, Región de Coquimbo, Chile. Consulta el mapa de ubicación, el clima en vivo, detalles de visita, la cercana Catedral de La Serena y consejos de viaje."><link rel="canonical"${addAttribute(canonical, "href")}><meta property="og:title" content="Plaza de Armas de La Serena - Guía de viaje de La Serena"><meta property="og:description" content="Guía completa del visitante de la Plaza de Armas de La Serena en La Serena, Región de Coquimbo, Chile."><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:locale" content="es_CL"><meta property="og:image"${addAttribute(siteUrl ? `${siteUrl}${hero}` : hero, "content")}><meta property="og:image:alt" content="Plaza de Armas de La Serena en La Serena"><meta name="theme-color" content="#102a43"><link rel="manifest" href="/manifest.webmanifest"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon-16.svg" sizes="16x16" type="image/svg+xml"><link rel="apple-touch-icon" href="/favicon.svg"><script async src="https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP"><\/script><script>const w=Function('return this')();w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-HXM22WWPKP');<\/script><script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script><script type="application/ld+json">${unescapeHTML(JSON.stringify(faqLd))}<\/script>${renderHead($$result)}</head><body><header class="fixed top-0 z-50 w-full border-b border-white/20 bg-[#102a43]/90 text-[#f8f3ea] backdrop-blur-md"><div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><a href="#inicio" class="flex items-center gap-3 text-sm font-bold tracking-[.18em] uppercase sans"><span class="grid size-9 place-items-center rounded-xl bg-[#f2c078]"><svg viewBox="0 0 32 32" class="size-7"><path d="M8 24h16M10 22V11l6-6 6 6v11M12 15h8M12 19h8" fill="none" stroke="#102a43" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>Plaza de La Serena</a><nav class="hidden gap-6 text-xs font-semibold uppercase tracking-wider md:flex"><a href="#sobre" class="hover:text-[#f2c078]">Sobre</a><a href="#clima" class="hover:text-[#f2c078]">Clima</a><a href="#historia" class="hover:text-[#f2c078]">Historia</a><a href="#rutas" class="hover:text-[#f2c078]">Rutas</a><a href="#ubicacion" class="hover:text-[#f2c078]">Ubicación</a><a href="#opiniones" class="hover:text-[#f2c078]">Opiniones</a></nav></div></header><main id="inicio"><section class="relative min-h-[92vh] overflow-hidden bg-[#102a43] text-[#f8f3ea]"><img${addAttribute(hero, "src")} alt="Plaza de Armas de La Serena - Vista principal en La Serena, Chile" class="absolute inset-0 size-full object-cover opacity-50"><div class="absolute inset-0 bg-gradient-to-r from-[#102a43] via-[#102a43]/70 to-transparent"></div><div class="relative mx-auto flex min-h-[92vh] max-w-6xl items-end px-5 pb-20 pt-32"><div class="max-w-3xl"><p class="sans mb-4 text-xs font-bold uppercase tracking-[.32em] text-[#f2c078]">Región de Coquimbo · Chile</p><p class="sans mb-5 text-xs tracking-wider text-[#c6d8de]">${breadcrumb.join(" → ")}</p><h1 class="max-w-3xl text-5xl leading-[.95] tracking-[-.03em] md:text-7xl">Plaza de Armas<br>de La Serena <em class="font-normal text-[#f2c078]">(La Serena)</em></h1><p class="mt-7 max-w-2xl text-lg leading-relaxed text-[#e3eef2]">Bienvenido a la <strong>Plaza de Armas de La Serena</strong>, reconocida como la <strong>Plaza de La Serena</strong>: el parque urbano y corazón del casco histórico. En pleno centro de <strong>La Serena</strong>, <strong>Región de Coquimbo</strong>, <strong>Chile</strong>, este destino es la parada principal y el punto de partida de los viajeros que visitan la región.</p><div class="card mt-8 max-w-xl rounded-2xl p-5 sans text-sm"><p class="flex flex-wrap items-center gap-3"><span class="text-2xl font-bold"${addAttribute(`Puntuación ${ratingValue} de 5`, "aria-label")}>${ratingValue}</span><span class="text-xl tracking-[.1em] text-[#f2c078]" aria-hidden="true">★★★★<span class="text-[#f2c078]/40">★</span></span><span class="text-[#36566d]">(${ratingCount} opiniones)</span></p><p class="mt-2 text-xs leading-relaxed text-[#36566d]">Puntuación y número de opiniones sincronizados desde las opiniones de usuarios de Google Maps · ${syncDate} · <a class="font-bold underline decoration-[#df7658]/60 underline-offset-2 hover:text-[#df7658]"${addAttribute(mapsShareUrl, "href")} target="_blank" rel="noopener noreferrer">Ver todas las opiniones en Google Maps ↗</a></p></div><div class="mt-7 flex flex-wrap gap-3 sans"><a href="#sobre" class="rounded-full bg-[#f2c078] px-6 py-3 text-sm font-bold text-[#102a43] hover:bg-white">Explorar la plaza ↓</a><a href="#clima" class="rounded-full border border-white/40 px-6 py-3 text-sm font-bold hover:border-[#f2c078] hover:text-[#f2c078]">Clima de hoy</a><a href="#ubicacion" class="rounded-full border border-white/40 px-6 py-3 text-sm font-bold hover:border-[#f2c078] hover:text-[#f2c078]">Ver ubicación</a></div></div></div><div class="absolute bottom-6 right-6 hidden max-w-xs border-l border-[#f2c078] pl-4 text-xs leading-relaxed text-[#e3eef2] md:block sans">Catedral de La Serena · Plaza de Armas de La Serena<br>Las imágenes pertenecen a sus respectivos fotógrafos.</div></section><section id="sobre" class="texture mx-auto max-w-6xl px-5 py-24"><div class="grid gap-12 md:grid-cols-[.75fr_1.25fr] md:items-end"><div><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">El corazón de la ciudad</p><h2 class="mt-4 text-4xl leading-none md:text-5xl">Sobre la Plaza de Armas de La Serena</h2></div><p class="text-xl leading-relaxed text-[#36566d]">La Plaza de Armas de La Serena, también conocida como Plaza de la Ciudadanía de La Serena, es el parque urbano que organiza el centro histórico: fuentes, palmeras y bancas de piedra bajo las galerías neocoloniales, con la Catedral de La Serena y los edificios públicos como telón de fondo. Una mañana de patrimonio aquí, una tarde frente al mar y una noche bajo el cielo del Elqui.</p></div><div class="mt-14 grid gap-6 md:grid-cols-3">${attractions.map((item, i) => renderTemplate`<article${addAttribute(`card lift overflow-hidden ${i === 1 ? "md:translate-y-10" : ""}`, "class")}><img${addAttribute(item.image, "src")}${addAttribute(item.alt, "alt")} class="h-64 w-full object-cover" loading="lazy"><div class="p-6"><p class="sans text-xs font-bold text-[#df7658]">0${i + 1}</p><h3 class="mt-2 text-2xl">${item.title}</h3><p class="mt-3 leading-relaxed text-[#36566d]">${item.text}</p></div></article>`)}</div></section>${weather && weather.current && weather.daily && renderTemplate`<section id="clima" class="bg-[#102a43] px-5 py-24 text-[#f8f3ea]"><div class="mx-auto max-w-6xl"><div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#f2c078]">Clima en vivo</p><h2 class="mt-4 text-4xl md:text-5xl">El clima ahora en la Plaza de La Serena</h2></div><p class="sans max-w-sm text-sm leading-relaxed text-[#c6d8de]">Pronóstico actualizado automáticamente para el centro de La Serena · actualizado a las ${formatHour(weather.current.time)} (hora local).</p></div><div class="grid gap-6 lg:grid-cols-[1.1fr_1.6fr]"><div class="card rounded-3xl p-8 text-[#102a43]"><p class="sans text-xs font-bold uppercase tracking-[.2em] text-[#df7658]">Ahora</p><p class="mt-4 flex items-start gap-4"><span class="text-6xl leading-none font-bold"${addAttribute(`${Math.round(weather.current.temperature_2m)} grados Celsius`, "aria-label")}>${Math.round(weather.current.temperature_2m)}°</span><span class="text-4xl text-[#f2c078]" aria-hidden="true">${weatherGlyph(weather.current.weather_code)}</span></p><p class="mt-2 text-lg">${weatherText(weather.current.weather_code)} · sensación térmica ${Math.round(weather.current.apparent_temperature)}°</p><dl class="sans mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[#36566d]"><div class="flex justify-between border-b border-[#102a43]/10 pb-2"><dt class="font-semibold">Humedad</dt><dd>${weather.current.relative_humidity_2m}%</dd></div><div class="flex justify-between border-b border-[#102a43]/10 pb-2"><dt class="font-semibold">Viento</dt><dd>${Math.round(weather.current.wind_speed_10m)} km/h</dd></div><div class="flex justify-between border-b border-[#102a43]/10 pb-2"><dt class="font-semibold">UV máx. hoy</dt><dd>${weather.daily.uv_index_max[0] != null ? `${Math.round(weather.daily.uv_index_max[0])} (${uvAdvice(weather.daily.uv_index_max[0])})` : "—"}</dd></div><div class="flex justify-between border-b border-[#102a43]/10 pb-2"><dt class="font-semibold">Prob. de lluvia</dt><dd>${weather.daily.precipitation_probability_max[0] != null ? `${weather.daily.precipitation_probability_max[0]}%` : "—"}</dd></div></dl><p class="sans mt-6 rounded-xl bg-[#f2c078]/25 p-4 text-sm font-bold">¿Llevar paraguas? ${umbrellaAdvice(weather)}</p></div><div class="card overflow-hidden rounded-3xl"><div class="overflow-x-auto"><table class="sans w-full min-w-[34rem] text-sm text-[#102a43]"><caption class="bg-[#f2c078] p-4 text-left text-xs font-bold uppercase tracking-[.2em]">Próximos 7 días</caption><thead><tr class="border-b border-[#102a43]/10 text-left text-xs uppercase tracking-wider text-[#36566d]"><th class="px-4 py-3">Día</th><th class="px-4 py-3">Condición</th><th class="px-4 py-3">Máx / Mín</th><th class="px-4 py-3">Lluvia</th><th class="px-4 py-3">UV</th></tr></thead><tbody>${weather.daily.time.map((d, i) => renderTemplate`<tr class="border-b border-[#102a43]/5 last:border-0"><td class="px-4 py-3"><span class="block font-bold capitalize">${i === 0 ? "Hoy" : weekdayShort(d)}</span><span class="text-xs text-[#36566d]">${dayNumber(d)}</span></td><td class="px-4 py-3"><span class="mr-2 text-lg" aria-hidden="true">${weatherGlyph(weather.daily.weather_code[i])}</span>${weatherText(weather.daily.weather_code[i])}</td><td class="px-4 py-3 font-bold">${Math.round(weather.daily.temperature_2m_max[i])}° / ${Math.round(weather.daily.temperature_2m_min[i])}°</td><td class="px-4 py-3">${weather.daily.precipitation_probability_max[i] != null ? `${weather.daily.precipitation_probability_max[i]}%` : "—"}</td><td class="px-4 py-3">${weather.daily.uv_index_max[i] != null ? Math.round(weather.daily.uv_index_max[i]) : "—"}</td></tr>`)}</tbody></table></div></div></div><p class="sans mt-6 text-xs leading-relaxed text-[#c6d8de]">El pronóstico se actualiza de forma automática; para decisiones sensibles confirma siempre con los avisos oficiales de la autoridad meteorológica.</p></div></section>`}<section id="historia" class="bg-[#dce9eb] px-5 py-24"><div class="mx-auto max-w-6xl"><div class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">Historia y significado</p><h2 class="mt-4 text-4xl md:text-5xl">Historia y significado de la Plaza de Armas de La Serena</h2></div><p class="max-w-md text-[#36566d]">Al visitar la Plaza de Armas de La Serena, los visitantes pueden recorrer fácilmente los hitos históricos que la rodean, incluidos la Catedral de La Serena y la Iglesia San Francisco.</p></div><div class="grid gap-5 md:grid-cols-3">${timeline.map((item) => renderTemplate`<article class="card lift rounded-2xl p-7"><p class="sans text-xs font-bold uppercase tracking-[.2em] text-[#df7658]">${item.year}</p><h3 class="mt-2 text-2xl">${item.title}</h3><p class="mt-3 leading-relaxed text-[#36566d]">${item.text}</p></article>`)}</div><article class="card mt-8 rounded-2xl p-8"><h3 class="text-2xl">Historias y leyendas del casco histórico</h3><p class="mt-4 leading-relaxed text-[#36566d]">La tradición oral del Norte Chico rodea a la plaza de relatos: el rescate de plata entregado al corsario Sharp en 1680 —del que se dice que una parte nunca llegó a manos de los asaltantes—, las campanas de la Catedral que guiaron a los pescadores entre la camanchaca, y las reconstrucciones pacientes tras cada terremoto, que hicieron de la piedra serena una seña de identidad. Historia y leyenda se mezclan aquí como la niebla con la mañana: cuéntalas, y verifícalas con las fuentes del museo local.</p></article></div></section><section id="temporadas" class="texture mx-auto max-w-6xl px-5 py-24"><div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">Estrategia estacional</p><h2 class="mt-4 text-4xl md:text-5xl">¿Cuándo visitar la plaza?</h2></div><p class="max-w-md text-[#36566d]">Panorama general por temporada: sol, camanchaca, viento y astronomía cambian la experiencia a lo largo del año.</p></div><div class="card overflow-hidden rounded-3xl"><div class="overflow-x-auto"><table class="sans w-full min-w-[44rem] text-left text-sm text-[#102a43]"><thead><tr class="bg-[#102a43] text-xs uppercase tracking-wider text-[#e3eef2]"><th class="px-5 py-4">Temporada</th><th class="px-5 py-4">Clima típico</th><th class="px-5 py-4">Visitantes</th><th class="px-5 py-4">Destacado</th></tr></thead><tbody>${seasons.map((s) => renderTemplate`<tr class="border-b border-[#102a43]/10 align-top last:border-0"><th scope="row" class="px-5 py-4 font-bold">${s.season}</th><td class="px-5 py-4 text-[#36566d]">${s.clima}</td><td class="px-5 py-4 text-[#36566d]">${s.visitors}</td><td class="px-5 py-4">${s.highlight}</td></tr>`)}</tbody></table></div></div><p class="sans mt-4 text-xs text-[#36566d]">Basado en promedios climáticos plurianuales de la región (normales climatológicas de la Dirección Meteorológica de Chile y reanálisis NOAA): un panorama general, no un pronóstico.</p></section><section id="rutas" class="bg-[#dce9eb] px-5 py-24"><div class="mx-auto max-w-6xl"><div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">Rutas a tu medida</p><h2 class="mt-4 text-4xl md:text-5xl">Recorridos según tu grupo</h2></div><p class="max-w-md text-[#36566d]">Tres formas distintas de vivir la plaza y su entorno: elige según tu ritmo, tus intereses y quienes te acompañan.</p></div><div class="grid gap-6 md:grid-cols-3">${audienceRoutes.map((r) => renderTemplate`<article class="card lift rounded-2xl p-7"><span class="text-3xl text-[#df7658]">${r.icon}</span><h3 class="mt-4 text-2xl">${r.title}</h3><p class="mt-3 leading-relaxed text-[#36566d]">${r.text}</p><p class="sans mt-4 border-l-2 border-[#f2c078] pl-3 text-sm font-semibold text-[#102a43]">${r.tips}</p></article>`)}</div><div class="mt-12 grid gap-6 md:grid-cols-2">${itineraries.map((it) => renderTemplate`<article class="card rounded-3xl p-8"><p class="sans inline-block rounded-full bg-[#102a43] px-4 py-1 text-xs font-bold uppercase tracking-[.2em] text-[#f2c078]">${it.label}</p><h3 class="mt-4 text-2xl">${it.title}</h3><p class="mt-3 leading-relaxed text-[#36566d]">${it.text}</p><p class="sans mt-4 text-xs font-bold uppercase tracking-wider text-[#df7658]">${it.note}</p></article>`)}</div></div></section><section id="servicios" class="texture mx-auto max-w-6xl px-5 py-24"><div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">Servicios y facilidades</p><h2 class="mt-4 text-4xl md:text-5xl">Lo que conviene saber antes de salir</h2></div><p class="max-w-md text-[#36566d]">Visión general y neutral de los servicios disponibles alrededor de la plaza: qué esperar y cómo organizarse, sin recomendaciones de locales específicos.</p></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">${services.map((s) => renderTemplate`<article class="card rounded-2xl p-6"><span class="text-2xl text-[#df7658]">${s.icon}</span><h3 class="mt-3 text-lg font-bold">${s.title}</h3><p class="mt-2 text-sm leading-relaxed text-[#36566d]">${s.text}</p></article>`)}</div></section><section id="plan" class="bg-[#dce9eb] px-5 py-24"><div class="mx-auto max-w-6xl"><div class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">Guía práctica</p><h2 class="mt-4 text-4xl md:text-5xl">Arma tu recorrido</h2></div><p class="max-w-md text-[#36566d]">La información cambia según temporada. Usa estas notas como brújula y confirma horarios y precios en el destino.</p></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><article class="card rounded-2xl p-7"><span class="text-3xl">✦</span><h3 class="mt-5 text-2xl">Mejor momento</h3><p class="mt-3 leading-relaxed text-[#36566d]">Primera hora en la plaza y el centro; atardecer en el Faro Monumental. Para astronomía, elige una noche despejada y sin luna intensa.</p><p class="sans mt-5 text-xs font-bold uppercase tracking-wider text-[#df7658]">Sugerencia · 2–3 días</p></article><article class="card rounded-2xl p-7"><span class="text-3xl">⌁</span><h3 class="mt-5 text-2xl">Cómo llegar y moverse</h3><p class="mt-3 leading-relaxed text-[#36566d]">El aeropuerto La Florida conecta la ciudad por carretera; desde Santiago también hay buses. La plaza está a pocos minutos a pie desde el terminal; en la ciudad: caminata, taxi colectivo y buses locales.</p><p class="sans mt-5 text-xs font-bold uppercase tracking-wider text-[#df7658]">Plaza · Centro · Costa · Valle</p></article><article class="card rounded-2xl p-7"><span class="text-3xl">◌</span><h3 class="mt-5 text-2xl">Entradas y costos</h3><p class="mt-3 leading-relaxed text-[#36566d]">La plaza y el centro histórico son gratuitos. Museos, tours astronómicos y observatorios tienen tarifas propias.</p><p class="sans mt-5 text-xs font-bold uppercase tracking-wider text-[#df7658]">Espacio público y gratuito</p></article><article class="card rounded-2xl p-7"><span class="text-3xl">⌂</span><h3 class="mt-5 text-2xl">Dónde estacionar</h3><p class="mt-3 leading-relaxed text-[#36566d]">En el centro prioriza estacionamientos formales y evita dejar objetos visibles; en la Avenida del Mar hay estacionamientos y espacios públicos señalizados.</p></article><article class="card rounded-2xl p-7"><span class="text-3xl">✺</span><h3 class="mt-5 text-2xl">Sabores del entorno</h3><p class="mt-3 leading-relaxed text-[#36566d]">Busca pescados y mariscos, empanadas de mar, papayas de la región y pisco del valle. En la Recova y en Caleta San Pedro y Peñuelas hay cocina marina.</p></article><article class="card rounded-2xl p-7"><span class="text-3xl">↗</span><h3 class="mt-5 text-2xl">Cerca de aquí</h3><p class="mt-3 leading-relaxed text-[#36566d]">Coquimbo y su Cruz del Tercer Milenio quedan al sur; Valle del Elqui, Vicuña y Paihuano abren la ruta de los cielos y el pisco.</p></article></div></div></section><section id="ubicacion" class="bg-[#102a43] px-5 py-24 text-[#f8f3ea]"><div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#f2c078]">Ubicación</p><h2 class="mt-4 text-4xl md:text-5xl">Ubicación y cómo visitar<br><em class="font-normal text-[#f2c078]">la Plaza de La Serena</em></h2><p class="mt-5 max-w-md leading-relaxed text-[#c6d8de]">Plaza de Armas de La Serena · La Serena, Región de Coquimbo, Chile · 29.9027° S, 71.2519° O · Espacio público de acceso gratuito.</p><a class="sans mt-8 inline-flex rounded-full border border-[#f2c078] px-5 py-3 text-sm font-bold text-[#f2c078] hover:bg-[#f2c078] hover:text-[#102a43]"${addAttribute(mapsShareUrl, "href")} target="_blank" rel="noopener noreferrer">Abrir en Google Maps ↗</a><p class="sans mt-6 max-w-md text-sm leading-relaxed text-[#c6d8de]">Para información oficial y turística regional, visita el <a class="font-bold underline decoration-[#f2c078]/60 underline-offset-2 hover:text-[#f2c078]"${addAttribute(govtTourismUrl, "href")} target="_blank" rel="noopener noreferrer">portal de la Municipalidad de La Serena</a>.</p></div><div class="overflow-hidden rounded-3xl border-8 border-white/10 bg-white"><iframe title="Mapa de la Plaza de Armas de La Serena, La Serena, Chile"${addAttribute(mapsEmbedSrc, "src")} width="100%" height="420" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div></div></section><section id="ciencia" class="texture mx-auto max-w-6xl px-5 py-24"><div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">Ciencia y responsabilidad</p><h2 class="mt-4 text-4xl md:text-5xl">Visitar con respeto: patrimonio, agua y cielos</h2></div><p class="max-w-md text-[#36566d]">La plaza es heredera de casi cinco siglos de historia y la puerta a uno de los entornos naturales más singulares del planeta: el desierto costero de Atacama y sus cielos.</p></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">${responsibilities.map((r) => renderTemplate`<article class="card rounded-2xl p-6"><span class="text-2xl text-[#df7658]">${r.icon}</span><h3 class="mt-3 text-lg font-bold">${r.title}</h3><p class="mt-2 text-sm leading-relaxed text-[#36566d]">${r.text}</p></article>`)}</div><article class="card mt-8 rounded-2xl p-8"><h3 class="text-2xl">¿Por qué la niebla de la mañana?</h3><p class="mt-4 leading-relaxed text-[#36566d]">La <strong>camanchaca</strong> es una niebla costera que se forma cuando el aire húmedo del Pacífico se enfría sobre la corriente de Humboldt y se desliza tierra adentro hasta toparse con los cerros. Al amanecer puede envolver la plaza en un velo gris que horas después se abre al sol: un fenómeno que sostiene la vida del desierto más árido del mundo y que regula el frescor característico de La Serena. Reconocerla es entender el clima de la ciudad.</p></article></section><section id="opiniones" class="bg-[#dce9eb] px-5 py-24"><div class="mx-auto max-w-4xl"><div class="text-center"><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">Opiniones</p><h2 class="mt-4 text-4xl md:text-5xl">Opiniones sobre la Plaza de Armas de La Serena</h2></div><div class="card mx-auto mt-12 max-w-2xl rounded-3xl p-8 text-center"><p class="text-5xl font-bold"${addAttribute(`Puntuación ${ratingValue} de 5`, "aria-label")}>${ratingValue}</p><p class="mt-2 text-2xl tracking-[.12em] text-[#df7658]" aria-hidden="true">★★★★<span class="text-[#df7658]/40">★</span></p><p class="sans mt-3 text-sm text-[#36566d]">${ratingCount} opiniones</p><p class="sans mt-6 text-xs leading-relaxed text-[#36566d]">Puntuación y número de opiniones sincronizados desde las opiniones de usuarios de Google Maps, ${syncDate}; los derechos de autor de las opiniones pertenecen a sus autores y a Google Maps.</p><a class="sans mt-6 inline-flex rounded-full bg-[#102a43] px-6 py-3 text-sm font-bold text-[#f8f3ea] hover:bg-[#df7658]"${addAttribute(mapsShareUrl, "href")} target="_blank" rel="noopener noreferrer">Ver todas las opiniones en Google Maps ↗</a></div></div></section><section class="texture mx-auto max-w-4xl px-5 py-24"><div class="text-center"><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">Preguntas frecuentes</p><h2 class="mt-4 text-4xl md:text-5xl">Antes de partir</h2></div><div class="mt-12 divide-y divide-[#102a43]/15">${faqs.map(([q, a]) => renderTemplate`<details class="group py-6"><summary class="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold"><span>${q}</span><span class="text-2xl text-[#df7658] transition group-open:rotate-45">+</span></summary><p class="mt-4 max-w-2xl leading-relaxed text-[#36566d]">${a}</p></details>`)}</div></section><section id="fuentes" class="bg-[#dce9eb] px-5 py-20"><div class="mx-auto max-w-4xl"><p class="sans text-xs font-bold uppercase tracking-[.28em] text-[#df7658]">Transparencia</p><h2 class="mt-4 text-3xl md:text-4xl">Fuentes y atribuciones</h2><div class="mt-8 space-y-5"><article class="card rounded-2xl p-6"><h3 class="text-xl font-bold">Opiniones y puntuación · Google Maps</h3><p class="sans mt-3 text-sm leading-relaxed text-[#36566d]">Puntuación (${ratingValue}) y recuento de opiniones (${ratingCount}) sincronizados desde las opiniones de usuarios de Google Maps, ${syncDate}; los derechos de autor de las opiniones pertenecen a sus autores y a Google Maps. <a class="font-bold underline decoration-[#df7658]/60 underline-offset-2 hover:text-[#df7658]"${addAttribute(mapsShareUrl, "href")} target="_blank" rel="noopener noreferrer">Ver todas las opiniones en Google Maps ↗</a></p></article><article class="card rounded-2xl p-6"><h3 class="text-xl font-bold">Pronóstico del tiempo · Open-Meteo</h3><p class="sans mt-3 text-sm leading-relaxed text-[#36566d]">El pronóstico del clima se obtiene en el servidor y se actualiza automáticamente; datos meteorológicos proporcionados por <a class="font-bold underline decoration-[#df7658]/60 underline-offset-2 hover:text-[#df7658]" href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open-Meteo</a>. Los promedios estacionales combinan normales climatológicas de la Dirección Meteorológica de Chile y reanálisis NOAA.</p></article><article class="card rounded-2xl p-6"><h3 class="text-xl font-bold">Portal oficial</h3><p class="sans mt-3 text-sm leading-relaxed text-[#36566d]">Para información oficial y turística regional de Chile / Región de Coquimbo, visita el <a class="font-bold underline decoration-[#df7658]/60 underline-offset-2 hover:text-[#df7658]"${addAttribute(govtTourismUrl, "href")} target="_blank" rel="noopener noreferrer">portal de la Municipalidad de La Serena</a>.</p></article><article class="card rounded-2xl p-6"><h3 class="text-xl font-bold">Imágenes</h3><p class="sans mt-3 text-sm leading-relaxed text-[#36566d]">Las imágenes mostradas en este sitio web pertenecen a sus respectivos fotógrafos; todos los derechos de autor se reservan a sus autores.</p></article></div></div></section></main><footer class="bg-[#0b1f31] px-5 py-12 text-[#c6d8de]"><div class="mx-auto flex max-w-6xl flex-col justify-between gap-7 md:flex-row md:items-end"><div><div class="flex items-center gap-3 text-lg font-bold text-[#f8f3ea]"><span class="grid size-9 place-items-center rounded-xl bg-[#f2c078] text-[#102a43]">✦</span>Plaza de La Serena · plazalaserena.com</div><p class="mt-4 max-w-md text-sm leading-relaxed">Una guía independiente y sin fines de lucro de la Plaza de Armas de La Serena, el corazón histórico de la ciudad.</p></div><p class="max-w-sm text-xs leading-relaxed md:text-right">Este sitio no es oficial ni está afiliado a la Municipalidad de La Serena, operadores turísticos o Google Maps. Verifica horarios, tarifas y condiciones directamente. Todas las imágenes mostradas pertenecen a sus respectivos fotógrafos y conservan todos sus derechos de autor.</p></div></footer><script>if('serviceWorker' in navigator){addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}<\/script></body></html>`;
}, "H:/GitHub/plazalaserena/.buildcheck/src/pages/index.astro", void 0);
var $$file = "H:/GitHub/plazalaserena/.buildcheck/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
