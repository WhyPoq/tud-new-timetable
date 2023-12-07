import moment from "moment"

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
                        className={ "desktop-table-weekday" + (el && el.isSame(moment.utc(), "day") ? " today" : "") }
                        key={ ind }
                        style={{
                            gridColumn: (2 + ind)
                        }} 
                    >
                        {el && el.format("ddd D")}
                        {!el && "-"}
                    </div>
                )
            })}

            <div className="desktop-table-weekday"></div>

        </div>
    );
}
 
export default DesktopTableWeekdays;