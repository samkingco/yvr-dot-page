import {
	index,
	integer,
	sqliteTable,
	text,
	uniqueIndex,
} from "drizzle-orm/sqlite-core"

export const users = sqliteTable(
	"users",
	{
		id: text("id").notNull().primaryKey(),
		email: text("email", { length: 255 }).notNull(),
		emailVerifiedAt: integer("email_verified_at"),
		createdAt: integer("created_at").notNull(),
		updatedAt: integer("updated_at").notNull(),
		role: text("role", { length: 32 }).notNull().default("user"),
		mailingList: integer("mailing_list", { mode: "boolean" })
			.notNull()
			.default(false),
	},
	(table) => ({
		email: uniqueIndex("user_email_unique").on(table.email),
	}),
)

export const emailVerifications = sqliteTable(
	"email_verifications",
	{
		id: text("id").notNull().primaryKey(),
		email: text("email", { length: 255 }).notNull(),
		code: text("code", { length: 6 }).notNull(),
		expiresAt: integer("expires_at").notNull(),
	},
	(table) => ({
		emailIndex: index("email_verification_email_index").on(table.email),
	}),
)

export const sessions = sqliteTable("sessions", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: integer("expires_at").notNull(),
})

export const profiles = sqliteTable(
	"profiles",
	{
		id: text("id").notNull().primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => users.id),
		username: text("username", { length: 32 }).notNull(),
		name: text("name", { length: 80 }),
		does: text("does", { length: 80 }).notNull(),
		website: text("website", { length: 255 }).notNull(),
		bio: text("bio", { length: 240 }).notNull(),
		approvedAt: integer("approved_at"),
		rejectedAt: integer("rejected_at"),
		actionedBy: text("actioned_by").references(() => users.id),
	},
	(table) => ({
		userId: uniqueIndex("profile_user_id_index").on(table.userId),
		username: uniqueIndex("profile_username_unique").on(table.username),
	}),
)
