import { cn } from "@utils"

/**
 * A workaround since `<slot />` cannot be used in a `textarea` element.
 */
export const textareaClassName = (_className?: string) =>
	cn(
		"text-md sm:text-sm leading-snug placeholder:text-foreground/30",
		"py-3 scroll-pb-4 resize-none",
		"appearance-none outline-none rounded-none",
		"bg-background border-b-2 border-foreground/20",
		"hover:border-foreground/30",
		"focus-visible:border-foreground",
		"motion-safe:transition-colors motion-safe:duration-150 motion-safe:ease-out",
		_className,
	)
