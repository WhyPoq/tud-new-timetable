import DesktopTableDay from "./DesktopTableDay";
import DesktopLessonsLines from "./DesktopLessonsLines";

import { compareAsc } from "date-fns"

const DesktopTableLessons = ({ lessons, fromDate, toDate, hourLen, fromTime, endTime, weekLength }) => {  

    const emptyDays = [];
    for(let i = 0; i < weekLength; i++){
        emptyDays.push(null);
    }

    return ( 
        <div className="desktop-lessons-wrapper">
            <DesktopLessonsLines 
                hourLen={ hourLen }
                fromTime={ fromTime }
                endTime={ endTime }
            />

            <div className="desktop-lessons">  
                {
                    fromDate && toDate && 
                    lessons.map((el, ind) =>{
                        return (
                            compareAsc(fromDate, el.day) <= 0 && 
                            compareAsc(el.day, toDate) <= 0 &&
                            <DesktopTableDay 
                                key={ ind } 
                                dayInfo={ el }
                                hourLen={ hourLen }
                                fromTime={ fromTime }
                                ind={ ind }
                                leftSide={ ind < lessons.length / 2 - 1 }
                            />
                        )
                    })
                }

                {
                    (!fromDate || !toDate || !lessons || lessons.length === 0) &&
                    emptyDays.map((el, ind) => {
                        return (
                            <DesktopTableDay 
                                key={ ind } 
                                dayInfo={ el }
                                hourLen={ hourLen }
                                fromTime={ fromTime }
                                ind={ ind }
                                leftSide={ ind < emptyDays.length / 2 - 1}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default DesktopTableLessons;