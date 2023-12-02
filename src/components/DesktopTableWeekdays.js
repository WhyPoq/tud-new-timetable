import { isToday } from "date-fns"
import { formatInTimeZone } from "date-fns-tz";

const DesktopTableWeekdays = ({ daysDates, firstColumnWidth, lastColumnWidth }) => {
    
    const columnsTemplate = `${firstColumnWidth}px repeat(${daysDates.length}, 
        minmax(0, 1fr)) ${lastColumnWidth}px`;

    return ( 
        <div 
            className="desktop-table-weekdays"
            style={{
                gridTemplateColumns: columnsTemplate
            }}
        >

            <div></div>
            
            {daysDates.map((el, ind) =>{
                return(
                    <div 
                        className={ "desktop-table-weekday" + (isToday(el) ? " today" : "") }
                        key={ ind }
                        style={{
                            gridColumn: (2 + ind)
                        }} 
                    >
                        {el && formatInTimeZone(el, 'Europe/Dublin', "E d")}
                        {!el && "-"}
                    </div>
                )
            })}

            <div className="desktop-table-weekday"></div>

        </div>
    );
}
 
export default DesktopTableWeekdays;