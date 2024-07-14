import { auth } from "@db/auth"
import { createDatabase } from "@db/create"
import type { MiddlewareHandler } from "astro"
import { verifyRequestOrigin } from "lucia"
import { Resend } from "resend"

export const onRequest: MiddlewareHandler = async (context, next) => {
	if (context.request.method !== "GET") {
		const originHeader = context.request.headers.get("Origin")
		const hostHeader = context.request.headers.get("Host")
		if (
			!originHeader ||
			!hostHeader ||
			!verifyRequestOrigin(originHeader, [hostHeader])
		) {
			return new Response(null, {
				status: 403,
			})
		}
	}

	const db = createDatabase(context.locals.runtime.env)
	context.locals.db = db

	const resend = new Resend(context.locals.runtime.env.RESEND_API_KEY)
	context.locals.resend = resend

	const lucia = auth(context.locals.runtime.env)
	context.locals.auth = lucia

	const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null
	if (!sessionId) {
		context.locals.session = null
		return next()
	}

	const { session } = await lucia.validateSession(sessionId)

	if (session?.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id)
		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie()
		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)
	}

	context.locals.session = session

	return await next()
}
