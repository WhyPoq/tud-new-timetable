import React, { useEffect, useState } from "react";

const VisitMessage = () => {
	const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		// Get the visit count from local storage or set it to 0 if it doesn't exist
		const visitCount = Number(localStorage.getItem("visitCount")) || 0;
		const getMessage = localStorage.getItem("messageShown");

		// Increment the visit count
		localStorage.setItem("visitCount", visitCount + 1);

		// Check if this is the 5th visit
		if (visitCount + 1 > 5 && getMessage === null) {
			setShowMessage(true);
			localStorage.setItem("messageShown", "true");
		}
	}, []);

	const closeMessage = () => {
		setShowMessage(false);
	};

	return (
		<div>
			{showMessage && (
				<div className="visit-message">
					<h3>
						To unlock <b>special timetable features</b>:
					</h3>
					<p>
						<b>Post about this app on instagram confessions</b>
					</p>
					<p>Then spin around yourself 3 times</p>

					<div className="visit-message-buttons">
						<button>No, thank you</button>
						<button onClick={closeMessage}>Will do it now</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default VisitMessage;
