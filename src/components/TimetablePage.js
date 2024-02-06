import { useState, useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import VisitMessage from "./VisitMessage";

const TimetablePage = () => {
	const [isMobile, setIsMobile] = useState(false);

	const mobileBreakpoint = 48; //in rem
	const rootFontScaled = 0.625;
	const rootFontSize =
		parseFloat(getComputedStyle(document.documentElement).fontSize) /
		rootFontScaled;

	// Update the state on window resize
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < mobileBreakpoint * rootFontSize);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		// Cleanup the event listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, [rootFontSize]);

	const [selectedProgram, setSelectedProgram] = useState(null);

	useEffect(() => {
		const loadedSelectedProgram = localStorage.getItem("selectedProgram");
		if (loadedSelectedProgram) {
			try {
				const programParsed = JSON.parse(loadedSelectedProgram);
				setSelectedProgram(programParsed);
				document.getElementById("search-input").value = programParsed
					? programParsed.Name
					: "";
			} catch (e) {
				console.log(
					"Error while loading selected program from local storage: " +
						e
				);
			}
		}
	}, []);

	useEffect(() => {
		if (selectedProgram) {
			localStorage.setItem(
				"selectedProgram",
				JSON.stringify(selectedProgram)
			);
		}
	}, [selectedProgram]);

	return (
		<div className="inner-body">
			<VisitMessage />

			<Header
				selectedProgram={selectedProgram}
				setSelectedProgram={setSelectedProgram}
			/>
			<Main selectedProgram={selectedProgram} isMobile={isMobile} />
			<Footer />
		</div>
	);
};

export default TimetablePage;
