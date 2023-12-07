import MobileTimetableLesson from "./MobileTimetableLesson";
import React from "react";

const MobileTimetableDay = React.forwardRef(({ dayInfo }, ref) => {
    return ( 
        <div ref={ref} 
            className={ "mobile-day" + ((dayInfo.lessons.length === 0) ? " empty" : "")}
        >
            <div className="mobile-day-heading">
                <h2 className="weekday">{ dayInfo.day.format("dddd") }</h2>
                <p className="date">{ dayInfo.day.format("D MMMM") }</p>
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