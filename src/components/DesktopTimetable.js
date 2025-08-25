import DesktopTableTopBar from "./DesktopTableTopBar";
import DesktopTableMain from "./DesktopTableMain";

const DesktopTimetable = ({
	displayedWeekStart,
	lessons,
	loadMore,
	isPending,
	reload,
	toToday,
	error,
}) => {
	return (
		<div className={"desktop-timetable" + (isPending ? " pending" : "")}>
			<DesktopTableTopBar
				displayedWeekStart={displayedWeekStart}
				loadMore={loadMore}
				reload={reload}
				toToday={toToday}
			/>
			<DesktopTableMain
				displayedWeekStart={displayedWeekStart}
				lessons={lessons}
				isPending={isPending}
				error={error}
			/>
		</div>
	);
};

export default DesktopTimetable;
