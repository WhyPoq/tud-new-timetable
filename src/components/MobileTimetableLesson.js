import getLessonColor from "../getLessonColor";
import constants from "../constants";
import { PersonIcon } from "./icons/PersonIcon";
import { LocationIcon } from "./icons/LocationIcon";

const MobileTimetableLesson = ({ lessonInfo, current }) => {
	const startTime = lessonInfo.StartDateTime.tz(constants.curTimezone).format("k:mm");
	const endTime = lessonInfo.EndDateTime.tz(constants.curTimezone).format("k:mm");

	let room = lessonInfo.Location;
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

	if (lessonInfo.Locations !== undefined) {
		rooms = lessonInfo.Locations.map((el) => {
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
	if (rooms.length === 1 && lessonInfo.Name) {
		const nameParts = lessonInfo.Name.split("/");
		const lastPart = nameParts[nameParts.length - 1];
		if (lastPart && !lastPart.toLowerCase().includes("sem")) {
			groupSpecification = lastPart;
		}
	}

	return (
		<div
			className={"mobile-lesson" + (current ? " current" : "")}
			style={{ "--type-color": getLessonColor(lessonInfo.EventType) }}
		>
			<div className="lesson-type-grid-item">
				{lessonInfo.EventType && (
					<p className="lesson-type lesson-type-grid-item">{lessonInfo.EventType}</p>
				)}
			</div>

			<div className="times">
				<p> {startTime}</p>
				<p> {endTime}</p>
			</div>

			<div className="mobile-lesson-content">
				<h3 className="lesson-heading">
					{lessonInfo.Description +
						(groupSpecification ? ` (${groupSpecification})` : "")}
				</h3>
				<p className="lesson-long-name"> {lessonInfo.Name} </p>

				{rooms.length === 1 && lessonInfo.staffName && (
					<p className="lesson-staff">
						<PersonIcon className="small-icon" />
						<span>{lessonInfo.staffName}</span>
					</p>
				)}

				<div className="lesson-rooms-wrapper">
					<LocationIcon className="small-icon" alt="" />
					<div className="lesson-rooms">
						{rooms.map((room, ind) => {
							return (
								<div key={ind}>
									<div className="lesson-room">
										<div>
											<span className="lesson-room-name">
												{room.nameSpecification &&
													room.nameSpecification + " — "}
												{room.location}
											</span>{" "}
											{room.staffName && <>({room.staffName})</>}
										</div>
									</div>
									{/* <p className="lesson-detailed-room"> { room.locationDetails && room.locationDetails } </p> */}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileTimetableLesson;
