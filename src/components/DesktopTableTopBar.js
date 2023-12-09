import { useEffect, useState, } from "react";

import nextArrow from "../assets/forwardArrow.svg";
import backArrow from "../assets/backArrow.svg";
import refreshIcon from "../assets/refreshIcon.svg";


const DesktopTableBarTop = ({ weeks, displayedWeek, hasPrev, hasNext, loadMore, setReset, toToday }) => {
    const [curInterval, setCurInterval] = useState("");

    useEffect(() =>{
        if(displayedWeek !== -1 && weeks.length > 0 && weeks[displayedWeek]){
            const day = (weeks[displayedWeek].FirstDayInWeek);
            const start = day.clone().startOf("isoWeek");
            const end = day.clone().endOf("isoWeek");
            
            let leftPart = start.format("MMMM D");

            let rightPart = "";
            if(start.isSame(end, "month")){
                rightPart = end.format("D");
            }
            else{
                rightPart = end.format("MMMM D");
            }

            rightPart += ", " + end.format("YYYY");
            if(!start.isSame(end, "year")){
                leftPart += ", " + start.format("YYYY");
            }

            setCurInterval(leftPart + " - " + rightPart);
        }
    }, [weeks, displayedWeek]);

    return ( 
        <div className="desktop-table-bar-top">
            
            <button 
                className="to-today"
                onClick={ toToday }
                tabIndex="0"
            >
                To Today
            </button>

            <button 
                className="reset-button"
                onClick={ () => setReset(true) }
            >
                <img src={ refreshIcon } alt="Reset" />
            </button>

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

            <div className="desktop-table-bar-top-date-wrapper">
                <p className="desktop-table-bar-top-date">{ curInterval }</p>
            </div>

        </div>
    );
}
 
export default DesktopTableBarTop;