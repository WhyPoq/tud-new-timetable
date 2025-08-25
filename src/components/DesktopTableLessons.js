import DesktopTableDay from "./DesktopTableDay";
import DesktopLessonsLines from "./DesktopLessonsLines";
import DesktopTimeLine from "./DesktopTimeLine";

import loadingAnimThin from "../assets/loadingThin.svg";
import errorIcon from "../assets/errorIcon.svg";

const DesktopTableLessons = ({
	lessons,
	fromDate,
	toDate,
	hourLen,
	fromTime,
	endTime,
	weekLength,
	isPending,
	error,
}) => {
	const emptyDays = [];
	for (let i = 0; i < weekLength; i++) {
		emptyDays.push(null);
	}

	return (
		<div className="desktop-lessons-wrapper">
			{(isPending || error) && (
				<div className="desktop-message-wrapper">
					<img
						className="desktop-message"
						src={isPending ? loadingAnimThin : errorIcon}
						alt={isPending ? "Loading..." : "Error"}
					/>
				</div>
			)}

			<DesktopTimeLine hourLen={hourLen} fromTime={fromTime} endTime={endTime} />

			<DesktopLessonsLines hourLen={hourLen} fromTime={fromTime} endTime={endTime} />

			<div className="desktop-lessons">
				{emptyDays.map((emptyEl, ind) => {
					const lessonEl = ind < lessons.length ? lessons[ind] : null;
					if (
						fromDate &&
						toDate &&
						lessonEl &&
						fromDate <= lessonEl.day &&
						lessonEl.day <= toDate
					) {
						return (
							<DesktopTableDay
								key={ind}
								dayInfo={lessonEl}
								hourLen={hourLen}
								fromTime={fromTime}
								ind={ind}
								leftSide={ind < lessons.length / 2 - 1}
							/>
						);
					}

					return (
						<DesktopTableDay
							key={ind}
							dayInfo={emptyEl}
							hourLen={hourLen}
							fromTime={fromTime}
							ind={ind}
							leftSide={ind < emptyDays.length / 2 - 1}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default DesktopTableLessons;
