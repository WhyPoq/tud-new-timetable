import { format } from "date-fns"

const DesktopTableWeekdays = ({ daysDates }) => {
    return ( 
        <>
            {daysDates.map((el, ind) =>{
                return(
                    <div 
                        className="desktop-table-weekday"
                        key={ ind }
                        style={ {
                            gridRow: 0,
                            gridColumn: (2 + ind)
                        } } 
                    >
                        {el && format(el, "E d")}
                    </div>
                )
            })}
        </>
    );
}
 
export default DesktopTableWeekdays;