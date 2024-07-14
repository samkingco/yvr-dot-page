import { drizzle } from "drizzle-orm/d1"
import { schema } from "."

export function createDatabase(env: Env) {
	const db = env.DB
	return drizzle(db, { schema })
}
