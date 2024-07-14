import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia } from "lucia"
import { schema } from "."
import { createDatabase } from "./create"

export const auth = (env: Env) => {
	const db = createDatabase(env)
	const adapter = new DrizzleSQLiteAdapter(db, schema.sessions, schema.users)
	return new Lucia(adapter, {
		sessionCookie: {
			attributes: {
				secure: env.ENVIRONMENT === "production",
			},
		},
	})
}
export type Auth = ReturnType<typeof auth>

declare module "lucia" {
	interface Register {
		Lucia: Auth
	}
}
