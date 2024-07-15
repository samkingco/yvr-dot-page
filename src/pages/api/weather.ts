import type { APIRoute } from "astro"
import * as v from "valibot"

const weatherSchema = v.object({
	weather: v.array(
		v.object({
			id: v.number(),
			main: v.string(),
			description: v.string(),
			icon: v.string(),
		}),
	),
	main: v.object({
		temp: v.number(),
		feels_like: v.number(),
		temp_min: v.number(),
		temp_max: v.number(),
		pressure: v.number(),
		humidity: v.number(),
	}),
	sys: v.object({
		sunrise: v.number(),
		sunset: v.number(),
	}),
})

// @ts-ignore
export const GET: APIRoute = async (context) => {
	const cache = context.locals.runtime.caches.default
	const url = context.request.url

	const cached = await cache.match(url)
	if (cached) {
		return cached
	}

	// Vancouver's coordinates
	const lat = 49.26
	const lon = -123.11

	const API_KEY = context.locals.runtime.env.WEATHER_API_KEY
	const weather = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
	)

	if (!weather.ok) {
		return new Response(weather.statusText, { status: weather.status })
	}

	const json = await weather.json()
	const data = v.parse(weatherSchema, json)

	const niceWeather = {
		description: data.weather[0].description,
		temp: Math.round(data.main.temp),
		feelsLike: Math.round(data.main.feels_like),
		min: Math.round(data.main.temp_min),
		max: Math.round(data.main.temp_max),
		pressure: Math.round(data.main.pressure),
		humidity: Math.round(data.main.humidity),
		sunrise: data.sys.sunrise * 1000,
		sunset: data.sys.sunset * 1000,
	}

	const response = new Response(JSON.stringify(niceWeather))
	response.headers.set("Cache-Control", "max-age=900")
	response.headers.set("Content-Type", "application/json")

	// Cache the response
	// @ts-ignore
	await cache.put(url, new Response(response.body, response))

	return response
}
