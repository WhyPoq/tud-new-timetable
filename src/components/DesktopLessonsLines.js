const DesktopLessonsLines = ({hourLen, fromTime, endTime}) => {
    const times = [];

    for(let i = fromTime; i < endTime - 1; i++){
        times.push(null);
    }

    return ( 
        <div className="desktop-lessons-lines">
            {times.map((el, ind) =>{
                return(
                    <div
                        className="horizontal-line"
                        key={ ind }
                        style={{height: hourLen + "rem"}}
                    >
                    </div>
                )
            })}
        </div>
    );
}
 
export default DesktopLessonsLines;