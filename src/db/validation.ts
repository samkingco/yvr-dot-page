import * as v from "valibot"

export const personSchema = v.object({
	username: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(2, "username must be at least 2 characters"),
		v.maxLength(32, "username must be 32 characters or less"),
	),
	name: v.optional(
		v.nullable(
			v.pipe(
				v.string(),
				v.trim(),
				v.maxLength(80, "name must be 80 characters or less"),
			),
		),
		null,
	),
	does: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1, "what you do is required"),
		v.maxLength(80, "what you do must be 80 characters or less"),
	),
	website: v.pipe(
		v.string(),
		v.trim(),
		v.url(),
		v.minLength(1, "website is required"),
		v.maxLength(255, "website must be 255 characters or less"),
	),
	bio: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1, "bio is required"),
		v.maxLength(240, "bio must be 240 characters or less"),
	),
})

export type Person = v.InferOutput<typeof personSchema>
export type PersonInput = v.InferInput<typeof personSchema>
