import { useState, useEffect, useCallback, useRef } from "react";

import constants from "../constants";
import moment from "moment-timezone";
import collapseLabGroups from "../collapseLabGroups";
import { fixDescr, predictLessonShortName, predictLessonType } from "../utils/helpers";

// adds days for each day of the week even if there are no lessons that day
function addEmptyDays(days, weekStart) {
	const rangeStart = weekStart.clone().startOf("isoWeek");
	const rangeEnd = weekStart.clone().endOf("isoWeek");

	var currentDate = rangeStart.clone();
	const newDays = [];
	let curFullDayInd = 0;

	while (currentDate.isSameOrBefore(rangeEnd, "day")) {
		if (curFullDayInd < days.length && currentDate.isSame(days[curFullDayInd].day, "day")) {
			newDays.push(days[curFullDayInd]);
			curFullDayInd++;
		} else {
			newDays.push({
				day: currentDate.clone(),
				lessons: [],
			});
		}

		currentDate.add(1, "day");
	}

	return newDays;
}

// removes unnecessary field from lesson objects which were returned from database + sorting them and collapsing lab groups
function organizeLessons(lessons) {
	//something went wong and lessons were not returned (or there are no lessons in that period)
	if (lessons.CategoryEvents.length === 0) {
		return [];
	}

	// get needed fields
	lessons = lessons.CategoryEvents[0].Results.map((el) => {
		const {
			StartDateTime: _StartDateTime,
			EndDateTime: _EndDateTime,
			Location,
			Description: _Description,
			Name,
			EventType: _EventType,
		} = el;

		const staffName = el?.ExtraProperties?.find((prop) => prop.Name === "Staff")?.Value;

		const StartDateTime = moment.utc(_StartDateTime);
		//const hackStartDSToffset = moment.tz(_StartDateTime, constants.curTimezone).utcOffset() * constants.minutesToHours;
		//StartDateTime.add(hackStartDSToffset, "hours");

		const EndDateTime = moment.utc(_EndDateTime);
		//const hackSEndDSToffset = moment.tz(_EndDateTime, constants.curTimezone).utcOffset() * constants.minutesToHours;
		//EndDateTime.add(hackSEndDSToffset, "hours");

		let EventType = _EventType;
		if (!EventType) {
			EventType = predictLessonType(Name);
		}

		let Description = _Description;
		if (!Description) {
			Description = predictLessonShortName(Name);
		}
		Description = fixDescr(Description);

		return {
			StartDateTime,
			EndDateTime,
			Location,
			Description,
			Name,
			EventType,
			staffName,
		};
	});

	lessons = lessons.sort((a, b) => {
		return a.StartDateTime - b.StartDateTime;
	});

	let daysWithLessons = [];

	//fold lessons into days
	for (let i = 0; i < lessons.length; i++) {
		const curLessonDay = lessons[i].StartDateTime.clone().startOf("day");
		if (
			daysWithLessons.length === 0 ||
			!daysWithLessons[daysWithLessons.length - 1].day.isSame(curLessonDay, "day")
		) {
			daysWithLessons.push({
				day: curLessonDay,
				lessons: [],
			});
		}

		daysWithLessons[daysWithLessons.length - 1].lessons.push(lessons[i]);
	}

	daysWithLessons = collapseLabGroups(daysWithLessons);

	return daysWithLessons;
}

function getReqBody(selectedProgram) {
	return selectedProgram === null
		? null
		: {
				ViewOptions: {
					Days: [
						{ DayOfWeek: 1 },
						{ DayOfWeek: 2 },
						{ DayOfWeek: 3 },
						{ DayOfWeek: 4 },
						{ DayOfWeek: 5 },
						{ DayOfWeek: 6 },
					],
				},
				CategoryTypesWithIdentities: [
					{
						CategoryTypeIdentity: selectedProgram.CategoryTypeIdentity,
						CategoryIdentities: [selectedProgram.Identity],
					},
				],
				FetchBookings: false,
				FetchPersonalEvents: false,
				PersonalIdentities: [],
		  };
}

export const useGetLessons = (
	selectedProgram,
	displayedWeekStart,
	isMobile,
	setClearLessonsContext
) => {
	const [lessons, setLessons] = useState([]);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const fetchingRef = useRef({});

	const fetchLessons = useCallback(
		(displayedWeekStart) => {
			if (fetchingRef.current.controller) {
				fetchingRef.current.controller.abort();
			}

			if (selectedProgram === null) {
				return;
			}

			const rangeStart = displayedWeekStart.clone();
			const rangeEnd = displayedWeekStart.clone().endOf("isoWeek");

			const lessonsUrl = `https://${constants.database_name}.azurewebsites.net/api/Public/CategoryTypes/Categories/Events/Filter/50a55ae1-1c87-4dea-bb73-c9e67941e1fd`;
			const requestUrl =
				lessonsUrl +
				"?startRange=" +
				rangeStart.toISOString() +
				"&endRange=" +
				rangeEnd.toISOString();

			const req = {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(getReqBody(selectedProgram)),
			};

			setIsPending(true);

			const controller = new AbortController();
			fetchingRef.current.controller = controller;
			const signal = controller.signal;

			fetch(requestUrl, req, {
				method: "get",
				signal: signal,
			})
				.then((res) => {
					if (res.ok) {
						return res.json();
					} else {
						let error = new Error("Network response was NOT ok");
						setError(error);
						setIsPending(false);
						throw new Error("Network response was NOT ok");
					}
				})
				.then((json) => {
					const organizedLessons = organizeLessons(json);
					const newLessons = addEmptyDays(organizedLessons, displayedWeekStart);

					setLessons((prevLessons) => {
						return isMobile ? [...prevLessons, ...newLessons] : newLessons;
					});
					setError(null);
				})
				.catch((error) => {
					if (error.name === "AbortError") return;
					console.log("Error while fetching lessons:", error);
					setError(error);
				})
				.finally(() => setIsPending(false));
		},
		[selectedProgram, isMobile]
	);

	useEffect(() => {
		fetchLessons(displayedWeekStart);
	}, [fetchLessons, displayedWeekStart]);

	const clearLessons = useCallback(() => {
		setLessons([]);
	}, []);

	useEffect(() => {
		setClearLessonsContext({ clearLessons });
	}, [clearLessons, setClearLessonsContext]);

	const reload = useCallback(() => {
		fetchLessons(displayedWeekStart);
	}, [displayedWeekStart, fetchLessons]);

	return { lessons, isPending, error, reload };
};
