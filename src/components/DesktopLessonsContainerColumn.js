import DesktopLesson from "./DesktopLesson";
import { parseISO } from "date-fns";

const DesktopLessonsContainerColumn = ({ content, hourLen, containerStartTime }) => {
    return ( 
        <div className="desktop-lessons-container-column">
            { content.lessons.map((lesson, ind) => {
                const prevLesson= ind > 0 ? content.lessons[ind - 1] : null;
                return <DesktopLesson 
                    key={ ind } 
                    content={ lesson } 
                    hourLen={ hourLen }
                    prevEndTime={ prevLesson ? parseISO(prevLesson.EndDateTime) : containerStartTime }
                />
            })}
        </div>
    );
}
 
export default DesktopLessonsContainerColumn;