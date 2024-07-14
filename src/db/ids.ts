import { customAlphabet } from "nanoid"

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const prefixes = {
	user: "usr",
	session: "ses",
	emailVerification: "evf",
	profile: "pro",
	event: "evt",
} as const

export function id<TPrefix extends keyof typeof prefixes>(
	prefix: TPrefix,
	length = 24,
) {
	const generatedId = customAlphabet(alphabet, length)()
	const prefixPart = prefixes[prefix]
	if (prefix.length === 0) {
		return generatedId
	}
	return `${prefixPart}_${generatedId}` as const
}

export function emailAuthCode(length = 6) {
	return customAlphabet("0123456789", length)()
}
