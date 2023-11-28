import { useEffect, useState, } from "react";
import {startOfWeek, endOfWeek, format, parseISO, isSameMonth, isSameYear } from "date-fns"

import nextArrow from "../assets/forwardArrow.svg";
import backArrow from "../assets/backArrow.svg";
// import dropdownArrow from "../assets/dropdownArrow.svg";


const DesktopTableBarTop = ({ weeks, displayedWeek, hasPrev, hasNext, loadMore }) => {
    const [curInterval, setCurInterval] = useState("");

    useEffect(() =>{
        if(displayedWeek !== -1 && weeks.length > 0 && weeks[displayedWeek]){
            const day = parseISO(weeks[displayedWeek].FirstDayInWeek);
            const start = startOfWeek(day, { weekStartsOn: 1 });
            const end = endOfWeek(day, { weekStartsOn: 1 });
            
            let leftPart = format(start, "LLLL d");
            let rightPart = "";
            if(isSameMonth(start, end)){
                rightPart = format(end, "d");
            }
            else{
                rightPart = format(end, "LLLL d");
            }

            rightPart += ", " + format(end, "yyyy");
            if(!isSameYear(start, end)){
                leftPart += ", " + format(start, "yyyy");
            }

            setCurInterval(leftPart + " - " + rightPart);
        }
    }, [weeks, displayedWeek]);

    return ( 
        <div className="desktop-table-bar-top">
            <button>To today</button>

            <div className="desktop-change-week-buttons">
                <button onClick={() => loadMore(-1)}>
                    <img 
                        src={ backArrow } 
                        alt="previous week"
                        disabled={ !hasPrev }
                    />
                </button>

                <button onClick={() => loadMore(1)}>
                    <img 
                        src={ nextArrow } 
                        alt="next week"
                        disabled={ !hasNext }
                    />
                </button>
            </div>

            <p className="desktop-table-bar-top-date">{ curInterval }</p>

            {/* <button aria-expanded="false" className="desktop-table-bar-top-week">
                <div className="desktop-cur-week-info">
                    <p>Week {displayedWeek + 1}</p>
                    <div>
                        <img src={ dropdownArrow } alt=""/>
                    </div>
                </div>

                <div className="desktop-weeks-dropdown">
                    <div>Week 12 - 13/11/2023</div>
                    <div>Week 12 - 13/11/2023</div>
                    <div>Week 12 - 13/11/2023</div>
                    <div>Week 12 - 13/11/2023</div>
                    <div>Week 12 - 13/11/2023</div>
                </div>
                
            </button> */}

            <button>Reset</button>
        </div>
    );
}
 
export default DesktopTableBarTop;