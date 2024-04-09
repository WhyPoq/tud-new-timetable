import React from "react";
import { useState, useEffect } from "react";

import moment from "moment";

import constants from "../constants";
import MobileTimetableLesson from "./MobileTimetableLesson";
import MobileBreak from "./MobileBreak";

const MobileTimetableDay = React.forwardRef(({ dayInfo }, ref) => {
	const [now, setNow] = useState(moment.utc().tz(constants.curTimezone));

	//recalculate currrent time every 10 minutes
	useEffect(() => {
		const interval = setInterval(() => {
			setNow(moment.utc().tz(constants.curTimezone));
		}, 10 * 60 * 1000); // 10 * 60 * 1000 ms = 10 minute

		return () => clearInterval(interval); // Cleanup on component unmount
	}, []);

	const [lessonsWithBreaks, setLessonsWithBreaks] = useState([]);

	useEffect(() => {
		const tmpLessons = [];
		for (let i = 0; i < dayInfo.lessons.length; i++) {
			if (i >= 1) {
				const breakLength = dayInfo.lessons[i].StartDateTime.clone().diff(
					dayInfo.lessons[i - 1].EndDateTime,
					"hours",
					true
				);

				const minBreakLength = 0.1; //in hours
				if (breakLength > minBreakLength) {
					tmpLessons.push({
						type: "break",
						data: {
							start: dayInfo.lessons[i - 1].EndDateTime,
							end: dayInfo.lessons[i].StartDateTime,
						},
					});
				}
			}

			tmpLessons.push({
				type: "lesson",
				data: dayInfo.lessons[i],
			});
		}

		setLessonsWithBreaks(tmpLessons);
	}, [dayInfo.lessons]);

	return (
		<div ref={ref} className={"mobile-day" + (lessonsWithBreaks.length === 0 ? " empty" : "")}>
			<div className="mobile-day-heading">
				<h2 className="weekday">{dayInfo.day.format("dddd")}</h2>
				<p className="date">{dayInfo.day.format("D MMMM")}</p>
			</div>

			{lessonsWithBreaks.length === 0 && <p className="mobile-no-lessons">no lessons</p>}

			{lessonsWithBreaks.length !== 0 && (
				<div className="mobile-day-lessons">
					{lessonsWithBreaks.map((el, ind) => {
						return el.type === "lesson" ? (
							<MobileTimetableLesson
								lessonInfo={el.data}
								key={ind}
								current={el.data.StartDateTime <= now && now < el.data.EndDateTime}
							/>
						) : (
							<MobileBreak
								breakInfo={el.data}
								key={ind}
								current={el.data.start <= now && now < el.data.end}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
});

export default MobileTimetableDay;
