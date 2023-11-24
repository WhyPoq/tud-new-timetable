const DesktopTableTimes = ({hourLen, fromTime, endTime}) => {
    const times = [];
    for(let i = fromTime; i < endTime; i++){
        times.push(i + ":00");
    }

    return ( 
        <div className="desktop-table-times">
            {times.map((el, ind) =>{
                return(
                    <div 
                        key={ ind }
                        style={{height: hourLen + "rem"}}
                    >
                        {el}
                    </div>
                )
            })}
        </div>
    );
}
 
export default DesktopTableTimes;