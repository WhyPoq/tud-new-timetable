import DesktopTableDay from "./DesktopTableDay";
import DesktopLessonsLines from "./DesktopLessonsLines";
import DesktopTimeLine from "./DesktopTimeLine";

import loadingAnimThin from "../assets/loadingThin.svg";
import errorIcon from "../assets/errorIcon.svg";


const DesktopTableLessons = ({ lessons, fromDate, toDate, hourLen, fromTime, 
        endTime, weekLength, isPending, error }) => {  

    const emptyDays = [];
    for(let i = 0; i < weekLength; i++){
        emptyDays.push(null);
    }

    return ( 
        <div 
            className="desktop-lessons-wrapper"
        >
            
            {(isPending || error) && 
                <div className="desktop-message-wrapper">
                    <img 
                        className="desktop-message"
                        src={ error ? errorIcon : loadingAnimThin } 
                        alt={ error ?  "Error" : "Loading..." }
                    />
                </div>
            }


            <DesktopTimeLine 
                hourLen={ hourLen }
                fromTime={ fromTime }
                endTime={ endTime }
            />

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
                            fromDate <= el.day && el.day <= toDate &&
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