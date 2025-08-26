import { useCallback, useEffect, useState } from "react";

export const useSelectedProgram = (clearLessonsContext, toToday) => {
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
				console.error("Error while loading selected program from local storage: " + e);
			}
		}
	}, []);

	const changeProgram = useCallback(
		(newProgram) => {
			setSelectedProgram(newProgram);
			if (newProgram) {
				localStorage.setItem("selectedProgram", JSON.stringify(newProgram));
			}

			if (clearLessonsContext.clearLessons) {
				clearLessonsContext.clearLessons();
				toToday();
			}
		},
		[toToday, clearLessonsContext]
	);

	return [selectedProgram, changeProgram];
};
