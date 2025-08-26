import { useMemo } from "react";

import { BackArrowIcon } from "./icons/BackArrowIcon";
import { ForwardArrowIcon } from "./icons/ForwardArrowIcon";
import { RefreshIcon } from "./icons/RefreshIcon";

const resetIconSize = 23;
const arrowIconSize = 16;

const DesktopTableBarTop = ({ displayedWeekStart, loadMore, reload, toToday }) => {
	const curInterval = useMemo(() => {
		const start = displayedWeekStart;
		const end = displayedWeekStart.clone().endOf("isoWeek");

		let leftPart = start.format("MMMM D");

		let rightPart = "";
		if (start.isSame(end, "month")) {
			rightPart = end.format("D");
		} else {
			rightPart = end.format("MMMM D");
		}

		rightPart += ", " + end.format("YYYY");
		if (!start.isSame(end, "year")) {
			leftPart += ", " + start.format("YYYY");
		}

		return leftPart + " - " + rightPart;
	}, [displayedWeekStart]);

	return (
		<div className="desktop-table-bar-top">
			<button className="to-today" onClick={toToday} tabIndex="0">
				To Today
			</button>

			<button className="reset-button" onClick={() => reload()}>
				<RefreshIcon width={resetIconSize} height={resetIconSize} alt="Reset" />
			</button>

			<div className="desktop-change-week-buttons">
				<button onClick={() => loadMore(-1)}>
					<BackArrowIcon
						width={arrowIconSize}
						height={arrowIconSize}
						alt="previous week"
					/>
				</button>

				<button onClick={() => loadMore(1)}>
					<ForwardArrowIcon
						width={arrowIconSize}
						height={arrowIconSize}
						alt="previous week"
					/>
				</button>
			</div>

			<div className="desktop-table-bar-top-date-wrapper">
				<p className="desktop-table-bar-top-date">{curInterval}</p>
			</div>
		</div>
	);
};

export default DesktopTableBarTop;
