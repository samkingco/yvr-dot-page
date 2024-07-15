/// <reference types="astro/client" />

type D1Database = import("@cloudflare/workers-types").D1Database
type Env = {
	ENVIRONMENT?: "preview" | "production"
	DB: D1Database
	RESEND_API_KEY: string
	WEATHER_API_KEY: string
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>

declare namespace App {
	interface Locals extends Runtime {
		db: import("./db").Database
		auth: import("./db/auth").Auth
		session: import("lucia").Session | null
		resend: import("resend").Resend
	}
}
