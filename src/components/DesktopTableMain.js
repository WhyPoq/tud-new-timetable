import DesktopTableTimes from "./DesktopTableTimes";
import DesktopTableWeekdays from "./DesktopTableWeekdays";
import DesktopTableLessons from "./DesktopTableLessons";

import { parseISO, startOfWeek, addDays, endOfDay } from "date-fns"

const DesktopTableMain = ({ weeks, displayedWeek, lessons }) => {
    const hourLen = 10;
    const fromTime = 8;
    const endTime = 22;

    const weekLength = 6;
    let fromDate = null;
    let toDate = null;

    const daysDates = [];
    for(let i = 0; i < weekLength; i++){
        daysDates.push(null);
    }

    if(displayedWeek !== -1 && weeks.length > 0 && weeks[displayedWeek]){
        fromDate = startOfWeek(parseISO(weeks[displayedWeek].FirstDayInWeek), { weekStartsOn: 1 });
        toDate = endOfDay(addDays(fromDate, weekLength - 1));

        for(let i = 0; i < weekLength; i++){
            daysDates[i] = addDays(fromDate, i);
        }
    }

    return ( 
        <div className="desktop-table-main">
            <DesktopTableWeekdays daysDates={ daysDates }/>
            <DesktopTableTimes 
                hourLen={ hourLen }
                fromTime={ fromTime }
                endTime={ endTime }
            />
            <DesktopTableLessons 
                lessons={ lessons }
                fromDate={ fromDate }
                toDate={ toDate }
                hourLen={ hourLen }
                fromTime={ fromTime }
            />
        </div>
    );
}
 
export default DesktopTableMain;