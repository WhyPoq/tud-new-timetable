import { differenceInHours, parseISO } from "date-fns";
import getLessonColor from "../getLessonColor";

const DesktopLesson = ({ content, hourLen, prevEndTime }) => {
    const duration = differenceInHours(
        parseISO(content.EndDateTime),
        parseISO(content.StartDateTime)
    );

    const topMargin = differenceInHours(
        parseISO(content.StartDateTime),
        prevEndTime
    );

    return ( 
        <div 
            className="desktop-lesson"
            style={{
                height: duration * hourLen + "rem",
                marginTop: topMargin * hourLen + "rem"
            }}
        >
            <div className="desktop-lesson-inner">
                <div 
                    className="desktop-lesson-type"
                    style={ {"--type-color": getLessonColor(content.EventType)} }
                >     
                </div>

                <div className="desktop-lesson-info">
                    {content.Description}
                </div>
            </div>
            
        </div>
    );
}
 
export default DesktopLesson;