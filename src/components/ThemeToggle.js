import { useTheme } from "../customHooks/useTheme";
import { DarkModeIcon } from "./icons/DarkModeIcon";
import { LightModeIcon } from "./icons/LightModeIcon";

const iconSize = 25;

export const ThemeToggle = () => {
	const { theme, toggle } = useTheme();
	const isDark = theme === "dark";

	return (
		<button type="button" onClick={toggle} className="theme-toggle">
			{isDark ? (
				<DarkModeIcon width={iconSize} height={iconSize} />
			) : (
				<LightModeIcon width={iconSize} height={iconSize} />
			)}
		</button>
	);
};
