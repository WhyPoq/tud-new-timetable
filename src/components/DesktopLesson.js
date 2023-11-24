import { differenceInHours, parseISO } from "date-fns";

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
            {content.Description}
        </div>
    );
}
 
export default DesktopLesson;