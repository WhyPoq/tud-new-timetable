import { useCallback, useEffect, useState } from "react";

const themeStorageKey = "theme";

const getPreferredTheme = () => {
	if (typeof window === "undefined") return "light";
	const saved = localStorage.getItem(themeStorageKey);
	if (saved) return saved;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useTheme = () => {
	const [theme, setTheme] = useState(getPreferredTheme);

	useEffect(() => {
		const root = document.documentElement;
		root.setAttribute("data-theme", theme);
	}, [theme]);

	useEffect(() => {
		const root = document.documentElement;
		root.setAttribute("data-theme", theme);

		// colors correspond to light and dark themes --c-bg values
		const themeColor = theme === "dark" ? "#1A1A1A" : "#FFFFFF";
		const metaThemeColor = document.querySelector("meta[name=theme-color]");
		if (metaThemeColor) {
			metaThemeColor.setAttribute("content", themeColor);
		}
	}, [theme]);

	// changing the theme if system theme changes and no preference is set
	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => {
			if (!localStorage.getItem(themeStorageKey)) {
				setTheme(media.matches ? "dark" : "light");
			}
		};
		media.addEventListener("change", handler);
		return () => media.removeEventListener("change", handler);
	}, []);

	const toggle = useCallback(() => {
		const newTheme = theme === "dark" ? "light" : "dark";
		localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	}, [theme]);

	return { theme, setTheme, toggle };
};
