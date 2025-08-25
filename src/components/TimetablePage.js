import { useState, useCallback } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import VisitMessage from "./VisitMessage";
import { useSelectedProgram } from "../customHooks/useSelectedProgram";
import { getCurWeekStartTime } from "../utils/helpers";
import { useIsMobile } from "../customHooks/useIsMobile";
import { useGetLessons } from "../customHooks/useGetLessons";

const TimetablePage = () => {
	const [displayedWeekStart, setDisplayedWeekStart] = useState(getCurWeekStartTime());

	const toToday = useCallback(() => {
		setDisplayedWeekStart(getCurWeekStartTime());
	}, []);

	const loadMore = useCallback((shiftDirection) => {
		setDisplayedWeekStart((prevWeekStart) => prevWeekStart.clone().add(shiftDirection, "week"));
	}, []);

	// using this context trick because we need clearLessons function before it can be created
	const [clearLessonsContext, setClearLessonsContext] = useState({});

	const [selectedProgram, setSelectedProgram] = useSelectedProgram(clearLessonsContext, toToday);

	const isMobile = useIsMobile(clearLessonsContext, toToday);

	const { lessons, isPending, error, reload } = useGetLessons(
		selectedProgram,
		displayedWeekStart,
		isMobile,
		setClearLessonsContext,
		toToday
	);

	return (
		<div className="inner-body">
			<VisitMessage />

			<Header selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram} />
			<Main
				isMobile={isMobile}
				lessons={lessons}
				isPending={isPending}
				error={error}
				reload={reload}
				loadMore={loadMore}
				displayedWeekStart={displayedWeekStart}
				toToday={toToday}
			/>
			<Footer />
		</div>
	);
};

export default TimetablePage;
