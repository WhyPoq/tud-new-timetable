import { useEffect, useState } from "react";

export const useIsMobile = (clearLessonsContext, toToday) => {
	const [isMobile, setIsMobile] = useState(false);

	const mobileBreakpoint = 48; //in rem
	const rootFontScaled = 0.625;
	const rootFontSize =
		parseFloat(getComputedStyle(document.documentElement).fontSize) / rootFontScaled;

	// Update the state on window resize
	useEffect(() => {
		const handleResize = () => {
			const newIsMobile = window.innerWidth < mobileBreakpoint * rootFontSize;
			if (isMobile !== newIsMobile && clearLessonsContext.clearLessons) {
				clearLessonsContext.clearLessons();
				toToday();
			}
			setIsMobile(newIsMobile);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		// Cleanup the event listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, [rootFontSize, isMobile, clearLessonsContext, toToday]);

	return isMobile;
};
