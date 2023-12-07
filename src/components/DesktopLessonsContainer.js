import DesktopLessonsContainerColumn from "./DesktopLessonsContainerColumn"; 
import constants from "../constants";

const DesktopLessonsContainer = ({ content, hourLen, prevContainer, fromTime, leftSide }) => {

    let topMargin = content.startTime.hour() - fromTime;

    if(prevContainer !== null){
        topMargin = content.startTime.diff(prevContainer.endTime) * constants.millisecondsToHours;
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