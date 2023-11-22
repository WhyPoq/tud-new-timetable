import { useRef, useCallback, useEffect, useState } from "react";
import MobileTimetableDay from "./MobileTimetableDay";
import { isPast, isToday } from "date-fns";

const MobileTimetable = ({ lessons, isPending, error, hasNext, 
    loadMore }) => { 

    const [mobileLessonsFiltered, setMobileLessonsFiltered] = useState([]);
    useEffect(() =>{
        setMobileLessonsFiltered(lessons.filter((el) => {
            return !isPast(el.day) || isToday(el.day);
        }));
    }, [lessons]); 

    const observer = useRef();
    const lastLessonRef = useCallback(node =>{
        if(isPending) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting && hasNext){
                loadMore(1);
            }
        });
        if(node) observer.current.observe(node);

    }, [isPending, hasNext, loadMore]);

    return ( 
        <div className="mobile-timetable">
            { mobileLessonsFiltered != null && mobileLessonsFiltered.length > 0 &&
                  
                <div className="mobile-timetable-days">
                    {
                        mobileLessonsFiltered.map((el, ind) => {
                            if(ind === mobileLessonsFiltered.length - 1){
                                return (
                                <MobileTimetableDay 
                                    ref={ lastLessonRef } 
                                    dayInfo={ el } 
                                    key={ ind } 
                                />);
                            }
                            return <MobileTimetableDay dayInfo={ el } key={ ind } />;
                        })
                    }
                </div>
            }
            
            { error && <h2>Error :(</h2> }
            { isPending && <h2>Loading...</h2> }
        </div>
    );
}
 
export default MobileTimetable;