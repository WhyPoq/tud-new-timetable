import DesktopTableDay from "./DesktopTableDay";

import { compareAsc } from "date-fns"

const DesktopTableLessons = ({ lessons, fromDate, toDate }) => {
    return ( 
        <>
            {lessons.map((el, ind) =>{
                return (
                    fromDate && toDate && compareAsc(fromDate, el.day) <= 0 && compareAsc(el.day, toDate) <= 0 &&
                    <DesktopTableDay key={ ind } dayInfo={ el }/>
                )
            })}
        </>
    );
}
 
export default DesktopTableLessons;