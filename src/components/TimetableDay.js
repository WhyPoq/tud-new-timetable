import TimetableLesson from "./TimetableLesson";
import { format } from "date-fns";
import React from "react";

const TimetableDay = React.forwardRef(({ dayInfo }, ref) => {
    return ( 
        <div ref={ref} 
            className={ "day" + ((dayInfo.lessons.length === 0) ? " empty" : "")}
        >
            <div className="day-heading">
                <h2 className="weekday">{ format(dayInfo.day, "iiii") }</h2>
                <p className="date">{ format(dayInfo.day, "d LLLL") }</p>
            </div>

            {dayInfo.lessons.length === 0 && 
                <p className="no-lessons">no lessons</p>
            }

            {dayInfo.lessons.length !== 0 && 
                <div className="day-lessons">
                {dayInfo.lessons.map((el, ind) => {
                    return <TimetableLesson lessonInfo={ el } key={ ind } />
                })}
                </div>
            }   
        </div>
    );
});
 
export default TimetableDay;