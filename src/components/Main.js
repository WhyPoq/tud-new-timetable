import { useState, useEffect, useCallback, useRef } from "react";

import { useGetLessons } from "../customHooks/useGetLessons";
import { useGetWeeks } from "../customHooks/useGetWeeks";
import MobileTimetable from "./MobileTimetable";
import DesktopTimetable from "./DesktopTimetable";
import moment from "moment/moment";

const Main = ({ selectedProgram, isMobile }) => {
	function getCurWeekId(weeks) {
		for (let i = 0; i < weeks.length; i++) {
			if (moment().utc().isSame(weeks[i].FirstDayInWeek, "isoWeek")) {
				return i;
			}
		}
		return -1;
	}

	const [weeks] = useGetWeeks();
	const [curWeek, setCurWeek] = useState(-1);
	const [displayedWeek, setDisplayedWeek] = useState(-1);
	useEffect(() => {
		const tmpCurWeek = getCurWeekId(weeks);
		setCurWeek(tmpCurWeek);
		setDisplayedWeek((prevDisplayedWeek) => {
			if (prevDisplayedWeek === -1) {
				return tmpCurWeek;
			}
			return prevDisplayedWeek;
		});
	}, [weeks]);

	const loadMore = useCallback(
		(shift = 0) => {
			setDisplayedWeek((prevWeek) => {
				const newWeek = prevWeek + shift;
				if (newWeek >= 0 && newWeek < weeks.length) {
					return newWeek;
				}
				return prevWeek;
			});
		},
		[weeks.length]
	);

	const toToday = useCallback(() => {
		setDisplayedWeek(curWeekRef.current);
	}, []);

	const curWeekRef = useRef(curWeek);
	useEffect(() => {
		curWeekRef.current = curWeek;
	}, [curWeek]);

	const [lessons, isPending, error, setReset] = useGetLessons(
		selectedProgram,
		weeks,
		displayedWeek,
		setDisplayedWeek,
		curWeekRef,
		isMobile
	);

	const [hasNext, setHasNext] = useState(false);
	const [hasPrev, setHasPrev] = useState(false);

	useEffect(() => {
		setHasNext(displayedWeek + 1 < weeks.length);
		setHasPrev(displayedWeek - 1 >= 0);
	}, [displayedWeek, weeks]);

	return (
		<main>
			{isMobile ? (
				<MobileTimetable
					lessons={lessons}
					isPending={isPending}
					error={error}
					hasNext={hasNext}
					loadMore={loadMore}
				/>
			) : (
				<DesktopTimetable
					weeks={weeks}
					displayedWeek={displayedWeek}
					lessons={lessons}
					hasPrev={hasPrev}
					hasNext={hasNext}
					loadMore={loadMore}
					isPending={isPending}
					setReset={setReset}
					toToday={toToday}
					error={error}
				/>
			)}
		</main>
	);
};

export default Main;
