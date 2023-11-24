import DesktopTableDay from "./DesktopTableDay";

import { compareAsc } from "date-fns"

const DesktopTableLessons = ({ lessons, fromDate, toDate, hourLen, fromTime, weekLength }) => {  

    const emptyDays = [];
    for(let i = 0; i < weekLength; i++){
        emptyDays.push(null);
    }

    return ( 
        <>  
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
                        />
                    )
                })
            }
        </>
    );
}
 
export default DesktopTableLessons;