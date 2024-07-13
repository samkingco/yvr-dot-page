import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const people = sqliteTable(
	"people",
	{
		username: text("username", { length: 32 }).notNull(),
		name: text("name", { length: 80 }),
		does: text("does", { length: 80 }).notNull(),
		website: text("website", { length: 255 }).notNull(),
		bio: text("bio", { length: 240 }).notNull(),
		approvedAt: integer("approved_at"),
	},
	(table) => {
		return {
			pk: primaryKey({
				columns: [table.username],
			}),
		}
	},
)
