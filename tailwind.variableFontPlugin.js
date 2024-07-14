const plugin = require("tailwindcss/plugin")

module.exports = plugin(({ addUtilities }) => {
	addUtilities({
		".font-italic": {
			fontStyle: "italic",
			fontVariationSettings: '"ital" 1',
		},
	})

	addUtilities({
		".font-thin": {
			fontWeight: "normal",
			fontVariationSettings: '"wght" 100',
		},
	})

	addUtilities({
		".font-extralight": {
			fontWeight: "normal",
			fontVariationSettings: '"wght" 200',
		},
	})

	addUtilities({
		".font-light": {
			fontWeight: "normal",
			fontVariationSettings: '"wght" 300',
		},
	})

	addUtilities({
		".font-normal": {
			fontWeight: "normal",
			fontVariationSettings: '"wght" 400',
		},
	})

	addUtilities({
		".font-medium": {
			fontWeight: "normal",
			fontVariationSettings: '"wght" 500',
		},
	})

	addUtilities({
		".font-semibold": {
			fontWeight: "normal",
			fontVariationSettings: '"wght" 600',
		},
	})

	addUtilities({
		".font-bold": {
			fontWeight: "normal",
			fontVariationSettings: '"wght" 700',
		},
	})
})
