import { useState, useEffect, useCallback, useRef } from "react";

import { isThisWeek, parseISO } from "date-fns";
import { useGetLessons } from "../customHooks/useGetLessons";
import { useGetWeeks } from "../customHooks/useGetWeeks";
import MobileTimetable from "./MobileTimetable";
import DesktopTimetable from "./DesktopTimetable";


const Main = ({ selectedProgram, isMobile }) => { 

    function getCurWeekId(weeks){
        for(let i = 0; i < weeks.length; i++){
            if(isThisWeek(parseISO(weeks[i].FirstDayInWeek), { weekStartsOn: 1 })){
                return i;
            }
        }
        return -1;
    }

    const loadMore = useCallback(() =>{
        setDisplayedWeek(prevWeek => prevWeek + 1);
    }, []);

    const [weeks] = useGetWeeks();
    const [curWeek, setCurWeek] = useState(-1);
    const [displayedWeek, setDisplayedWeek] = useState(-1);
    useEffect(() => {
        const tmpCurWeek = getCurWeekId(weeks);
        setCurWeek(tmpCurWeek);
        setDisplayedWeek(prevDisplayedWeek => {
            if(prevDisplayedWeek === -1){
                return tmpCurWeek;
            }
            return prevDisplayedWeek;
        });
    }, [weeks]);

    const curWeekRef = useRef(curWeek);
    useEffect(() => {
        curWeekRef.current = curWeek;
      }, [curWeek]);

    const [lessons, isPending, error] = 
        useGetLessons(selectedProgram, weeks, displayedWeek, setDisplayedWeek, curWeekRef); 

    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);

    useEffect(() =>{
        setHasNext((displayedWeek + 1) < weeks.length);
        setHasPrev((displayedWeek - 1) >= 0);
    }, [displayedWeek, weeks]);


    return (
        <main>
            { isMobile 
                ?
                    <MobileTimetable 
                        lessons={ lessons }
                        isPending={ isPending }
                        error={ error }
                        hasNext={ hasNext }
                        loadMore={ loadMore }
                    />
                : 
                    <DesktopTimetable 
                        hasPrev={ hasPrev }
                        hasNext={ hasNext }
                    />
            }
        </main>
    );
}
 
export default Main;
