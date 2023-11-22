import MobileTimetableLesson from "./MobileTimetableLesson";
import { format } from "date-fns";
import React from "react";

const MobileTimetableDay = React.forwardRef(({ dayInfo }, ref) => {
    return ( 
        <div ref={ref} 
            className={ "mobile-day" + ((dayInfo.lessons.length === 0) ? " empty" : "")}
        >
            <div className="mobile-day-heading">
                <h2 className="weekday">{ format(dayInfo.day, "iiii") }</h2>
                <p className="date">{ format(dayInfo.day, "d LLLL") }</p>
            </div>

            {dayInfo.lessons.length === 0 && 
                <p className="mobile-no-lessons">no lessons</p>
            }

            {dayInfo.lessons.length !== 0 && 
                <div className="mobile-day-lessons">
                {dayInfo.lessons.map((el, ind) => {
                    return <MobileTimetableLesson lessonInfo={ el } key={ ind } />
                })}
                </div>
            }   
        </div>
    );
});
 
export default MobileTimetableDay;