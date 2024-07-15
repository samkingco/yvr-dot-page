import { id, schema } from "@db"
import { Receiver } from "@upstash/qstash"
import type { APIRoute } from "astro"
import * as v from "valibot"

export const GET: APIRoute = async (context) => {
	const { db } = context.locals

	const weather = await db.query.weather.findFirst({
		orderBy: (table, { desc }) => desc(table.createdAt),
	})

	const response = new Response(JSON.stringify(weather))
	response.headers.set("Cache-Control", "max-age=900")
	response.headers.set("Content-Type", "application/json")

	return response
}

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

export const POST: APIRoute = async (context) => {
	const receiver = new Receiver({
		currentSigningKey: context.locals.runtime.env.QSTASH_CURRENT_SIGNING_KEY,
		nextSigningKey: context.locals.runtime.env.QSTASH_NEXT_SIGNING_KEY,
	})

	const signature = context.request.headers.get("Upstash-Signature")
	if (!signature) {
		return new Response("No signature found", { status: 403 })
	}

	const body = await context.request.json()
	const isValid = receiver.verify({
		signature,
		body: JSON.stringify(body),
		url: context.request.url,
	})

	if (!isValid) {
		return new Response("Invalid signature", { status: 403 })
	}

	const { db } = context.locals

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
		id: id("weather"),
		createdAt: Date.now(),
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

	await db.insert(schema.weather).values(niceWeather)

	return new Response(JSON.stringify(niceWeather))
}
