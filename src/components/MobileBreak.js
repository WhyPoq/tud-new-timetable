import constants from "../constants";

const MobileBreak = ({ breakInfo, current }) => {
	const fromStr = breakInfo.start.tz(constants.curTimezone).format("k:mm");
	const toStr = breakInfo.end.tz(constants.curTimezone).format("k:mm");

	return (
		<div className={"mobile-lesson mobile-break" + (current ? " current" : "")}>
			{/* empty div to fit the grid */}
			<div></div>

			<div className="mobile-break-content">
				<div className="mobile-break-line"></div>
				<div>
					<p className="mobile-break-text">
						...free from {fromStr} to {toStr}
					</p>
					<div className="mobile-break-text-underline"></div>
				</div>
			</div>
		</div>
	);
};

export default MobileBreak;
