import React from "react";

const DesktopTableTimes = React.forwardRef(({hourLen, fromTime, endTime}, ref) => {
    const times = [];

    for(let i = fromTime; i < endTime; i++){
        times.push(i + ":00");
    }

    return ( 
        <div className="desktop-table-times" ref={ ref }>
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
});
 
export default DesktopTableTimes;