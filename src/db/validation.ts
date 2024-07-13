import * as v from "valibot"

export const personSchema = v.object({
	username: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(2, "must be at least 2 characters"),
		v.maxLength(32, "must be 32 characters or less"),
	),
	name: v.optional(
		v.nullable(
			v.pipe(
				v.string(),
				v.trim(),
				v.maxLength(80, "must be 80 characters or less"),
			),
		),
		null,
	),
	does: v.pipe(
		v.string(),
		v.trim(),
		v.maxLength(80, "must be 80 characters or less"),
	),
	website: v.pipe(
		v.string(),
		v.trim(),
		v.maxLength(255, "must be 255 characters or less"),
	),
	bio: v.pipe(
		v.string(),
		v.trim(),
		v.maxLength(240, "must be 240 characters or less"),
	),
})

export type Person = v.InferOutput<typeof personSchema>
export type PersonInput = v.InferInput<typeof personSchema>
