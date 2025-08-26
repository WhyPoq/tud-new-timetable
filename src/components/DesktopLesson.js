import { useState } from "react";
import personIcon from "../assets/personIcon.svg";
import locationIcon from "../assets/locationIcon.svg";
import clockIcon from "../assets/clockIcon.svg";

import getLessonColor from "../getLessonColor";
import constants from "../constants";
import { ClockIcon } from "./icons/ClockIcon";
import { PersonIcon } from "./icons/PersonIcon";
import { LocationIcon } from "./icons/LocationIcon";

const DesktopLesson = ({ content, hourLen, prevEndTime, leftSide }) => {
	const duration =
		content.EndDateTime.diff(content.StartDateTime) * constants.millisecondsToHours;
	const topMargin = content.StartDateTime.diff(prevEndTime) * constants.millisecondsToHours;

	const startTime = content.StartDateTime.tz(constants.curTimezone).format("k:mm");
	const endTime = content.EndDateTime.tz(constants.curTimezone).format("k:mm");

	let room = content.Location;
	let roomDetailed = [""];

	if (room !== null) {
		let splitPos = room.search(" ");
		if (splitPos !== -1) {
			roomDetailed = room.slice(splitPos);
			room = room.slice(0, splitPos);
		}
	}

	let rooms = [];
	rooms.push({ location: room, locationDetails: roomDetailed });

	if (content.Locations !== undefined) {
		rooms = content.Locations.map((el) => {
			let room = el.location;
			let roomDetailed = [""];

			if (room !== null) {
				let splitPos = room.search(" ");
				if (splitPos !== -1) {
					roomDetailed = room.slice(splitPos);
					room = room.slice(0, splitPos);
				}
			}

			return {
				nameSpecification: el.nameSpecification,
				location: room,
				locationDetails: roomDetailed,
				staffName: el.staffName,
			};
		});
	}

	let groupSpecification = null;
	if (rooms.length === 1 && content.Name) {
		const nameParts = content.Name.split("/");
		const lastPart = nameParts[nameParts.length - 1];
		if (lastPart && !lastPart.toLowerCase().includes("sem")) {
			groupSpecification = lastPart;
		}
	}

	const [visiblePopup, setVisiblePopup] = useState(false);
	let popupTimer;
	const showPopup = () => {
		setVisiblePopup(true);
	};
	const hidePopup = () => {
		setVisiblePopup(false);
	};

	const onHover = () => {
		if (popupTimer) {
			clearInterval(popupTimer);
		}
		popupTimer = setTimeout(showPopup, 400);
	};
	const onStopHover = () => {
		if (popupTimer) {
			clearInterval(popupTimer);
		}

		if (visiblePopup) {
			setVisiblePopup(false);
		}
	};

	const lessonInfoShared = (
		<>
			<h3 className="lesson-heading">
				{content.Description + (groupSpecification ? ` (${groupSpecification})` : "")}
			</h3>
			<p className="lesson-long-name"> {content.Name} </p>
			{rooms.length === 1 && content.staffName && (
				<p className="lesson-staff">
					<PersonIcon className="small-icon" />
					<span>{content.staffName}</span>
				</p>
			)}

			<div className="lesson-rooms-wrapper">
				<LocationIcon className="small-icon" />
				<div className="lesson-rooms">
					{rooms.map((room, ind) => {
						return (
							<div key={ind}>
								<div className="lesson-room-container">
									<p>
										<span className="lesson-room-name">
											{room.nameSpecification &&
												room.nameSpecification + " — "}
											{room.location}
										</span>{" "}
										{room.staffName && <>({room.staffName})</>}
									</p>
								</div>
								{/* <p className="lesson-detailed-room"> { room.locationDetails && room.locationDetails } </p> */}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);

	return (
		<div
			className={"desktop-lesson" + (visiblePopup ? " show-popup" : "")}
			style={{
				height: duration * hourLen + "rem",
				marginTop: topMargin * hourLen + "rem",
				"--type-color": getLessonColor(content.EventType),
			}}
			onMouseEnter={onHover}
			onMouseLeave={onStopHover}
			onClick={showPopup}
			onFocus={showPopup}
			onBlur={hidePopup}
			tabIndex="0"
		>
			<div
				className="desktop-lesson-popup"
				style={{
					left: leftSide ? "100%" : "auto",
					right: leftSide ? "auto" : "100%",
				}}
			>
				<div
					className="desktop-lesson-inner-popup"
					style={{
						marginLeft: leftSide ? "1rem" : 0,
						marginRight: leftSide ? 0 : "1rem",
					}}
				>
					{content.EventType && <p className="lesson-type">{content.EventType}</p>}
					{lessonInfoShared}
					<p className="time">
						<ClockIcon className="small-icon" />
						{startTime + "-" + endTime}
					</p>
				</div>
			</div>

			<div className="desktop-lesson-inner">
				<div className="desktop-lesson-type"></div>

				<div className="desktop-lesson-info">
					<p className="time"> {startTime}</p>

					{lessonInfoShared}
				</div>
			</div>
		</div>
	);
};

export default DesktopLesson;
