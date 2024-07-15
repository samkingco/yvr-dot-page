import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatWebsite(website: string) {
	const websiteAsUrl = new URL(website)
	let formattedWebsite = websiteAsUrl.hostname

	if (website.includes("twitter.com")) {
		const match = RegExp(
			/(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^/?\s]*)/,
		).exec(website)
		if (match?.[1]) {
			formattedWebsite = `twitter @${match[1]}`
		}
	}

	if (website.includes("x.com")) {
		const match = RegExp(
			/(?:https?:\/\/)?(?:www\.)?x\.com\/(?:#!\/)?@?([^/?\s]*)/,
		).exec(website)
		if (match?.[1]) {
			formattedWebsite = `x @${match[1]}`
		}
	}

	if (website.includes("instagram.com")) {
		const match = RegExp(
			/(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:#!\/)?@?([^/?\s]*)/,
		).exec(website)
		if (match?.[1]) {
			formattedWebsite = `ig @${match[1]}`
		}
	}

	if (website.includes("threads.net")) {
		const match = RegExp(
			/(?:https?:\/\/)?(?:www\.)?threads\.net\/(?:#!\/)?@?([^/?\s]*)/,
		).exec(website)
		if (match?.[1]) {
			formattedWebsite = `threads @${match[1]}`
		}
	}

	return formattedWebsite
}
