import { format } from "date-fns"

const DesktopTableWeekdays = ({ daysDates, firstColumnWidth }) => {
    return ( 
        <div className="desktop-table-weekdays">
            <div style={{width: firstColumnWidth + "px"}}></div>
            
            {daysDates.map((el, ind) =>{
                return(
                    <div 
                        className="desktop-table-weekday"
                        key={ ind }
                        style={{
                            gridColumn: (2 + ind)
                        }} 
                    >
                        {el && format(el, "E d")}
                        {!el && "-"}
                    </div>
                )
            })}
        </div>
    );
}
 
export default DesktopTableWeekdays;