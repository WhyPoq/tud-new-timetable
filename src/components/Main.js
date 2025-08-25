import MobileTimetable from "./MobileTimetable";
import DesktopTimetable from "./DesktopTimetable";

const Main = ({
	isMobile,
	lessons,
	isPending,
	error,
	reload,
	loadMore,
	displayedWeekStart,
	toToday,
}) => {
	return (
		<main>
			{isMobile ? (
				<MobileTimetable
					lessons={lessons}
					isPending={isPending}
					error={error}
					loadMore={loadMore}
				/>
			) : (
				<DesktopTimetable
					displayedWeekStart={displayedWeekStart}
					lessons={lessons}
					loadMore={loadMore}
					isPending={isPending}
					reload={reload}
					toToday={toToday}
					error={error}
				/>
			)}
		</main>
	);
};

export default Main;
