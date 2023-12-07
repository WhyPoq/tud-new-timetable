import { useState, useEffect } from "react";

import constants from "../constants";
import moment from "moment";

const DesktopTimeLine = ({ hourLen, fromTime, endTime }) => {

    const [now, setNow] = useState(moment.utc());
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment().utc());
        }, 60 * 1000); // 60 * 1000 ms = 1 minute

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const hoursPassed = now.diff(now.startOf("day")) * constants.millisecondsToHours;

    return (
        <div className="desktop-timeline-wrapper">
            {
                hoursPassed > 0 && hoursPassed < (endTime - fromTime) &&
                <div
                    className="desktop-timeline"
                    style={{
                        marginTop: hoursPassed * hourLen + "rem"
                    }}
                >
                    <div></div>
                </div>
            }
        </div>
    );
}

export default DesktopTimeLine;