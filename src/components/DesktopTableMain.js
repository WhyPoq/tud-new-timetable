import DesktopTableTimes from "./DesktopTableTimes";
import DesktopTableWeekdays from "./DesktopTableWeekdays";
import DesktopTableLessons from "./DesktopTableLessons";

import { useState, useRef, useEffect} from "react";
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

    const timeColumnRef = useRef(null);
    const [timeColumnWidth, setTimeColumnWidth] = useState(0);
    useEffect(() => {
        const measureWidth = () => {
            if (timeColumnRef.current) {
              const scrollbarWidth = timeColumnRef.current.offsetWidth - timeColumnRef.current.clientWidth;
              setTimeColumnWidth(timeColumnRef.current.offsetWidth - scrollbarWidth);
            }
          };

        const timeColumnElement = timeColumnRef.current;

        let observer;
        let timeoutId   
        //is observer is suported
        if ('ResizeObserver' in window){   
            if (timeColumnElement) {
                // Create a ResizeObserver to listen to size changes
                observer = new ResizeObserver((entries) => {
                    if (entries[0].target === timeColumnRef.current) {
                        measureWidth();
                    }
                });
            
                // Start observing the time column
                observer.observe(timeColumnElement);
            }
        }
        else{
            timeoutId = setTimeout(measureWidth, 10);
        }
      
        return () => {
          // Disconnect the observer on cleanup
          if (observer) {
            observer.disconnect();
          }
          if(timeoutId){
            clearTimeout(timeoutId);
          }
        };
      }, []); // Empty dependency array ensures this effect runs once on mount

    return ( 
        <div className="desktop-table-main">  

            <DesktopTableWeekdays 
                daysDates={ daysDates } 
                firstColumnWidth={ timeColumnWidth }
            />

            <div className="desktop-table-scrollable">
                <DesktopTableTimes 
                    hourLen={ hourLen }
                    fromTime={ fromTime }
                    endTime={ endTime }
                    ref={ timeColumnRef }
                />
                <DesktopTableLessons 
                    lessons={ lessons }
                    fromDate={ fromDate }
                    toDate={ toDate }
                    hourLen={ hourLen }
                    fromTime={ fromTime }
                    weekLength={ weekLength }
                />
            </div>
        </div>
    );
}
 
export default DesktopTableMain;