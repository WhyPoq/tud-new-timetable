import DesktopLessonsContainerColumn from "./DesktopLessonsContainerColumn"; 
import { differenceInHours, getHours } from "date-fns"

const DesktopLessonsContainer = ({ content, hourLen, prevContainer, fromTime, leftSide }) => {

    let topMargin = getHours(content.startTime) - fromTime;

    if(prevContainer !== null){
        topMargin = differenceInHours(
            content.startTime,
            prevContainer.endTime
        );
    }

    return (  
        <div 
            className="desktop-lessons-container"
            style={{
                marginTop: topMargin * hourLen + "rem"
            }}
        >
            { content.columns.map((column, ind) => {
                return <DesktopLessonsContainerColumn 
                    key={ ind } 
                    content={ column } 
                    hourLen={ hourLen }
                    containerStartTime={ content.startTime }
                    leftSide={ leftSide }
                />
            }) }
        </div>
    );
}
 
export default DesktopLessonsContainer;