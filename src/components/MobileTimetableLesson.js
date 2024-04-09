import getLessonColor from "../getLessonColor";
import constants from "../constants";

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
			<p className="lesson-type">{lessonInfo.EventType}</p>

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

				<div className="lesson-rooms">
					{rooms.map((room, ind) => {
						return (
							<div key={ind}>
								<div className="lesson-room">
									<p>
										{room.nameSpecification && room.nameSpecification + " — "}
										{room.location}
									</p>
								</div>
								{/* <p className="lesson-detailed-room"> { room.locationDetails && room.locationDetails } </p> */}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default MobileTimetableLesson;
