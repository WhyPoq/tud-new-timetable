import DesktopLesson from "./DesktopLesson";

const DesktopLessonsContainerColumn = ({ content, hourLen, containerStartTime, leftSide }) => {
    return ( 
        <div className="desktop-lessons-container-column">
            { content.lessons.map((lesson, ind) => {
                const prevLesson= ind > 0 ? content.lessons[ind - 1] : null;
                return <DesktopLesson 
                    key={ ind } 
                    content={ lesson } 
                    hourLen={ hourLen }
                    prevEndTime={ prevLesson ? (prevLesson.EndDateTime) : containerStartTime }
                    leftSide={ leftSide }
                />
            })}
        </div>
    );
}
 
export default DesktopLessonsContainerColumn;