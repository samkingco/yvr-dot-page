import type { APIRoute } from "astro"

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
