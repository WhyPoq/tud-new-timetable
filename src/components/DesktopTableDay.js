import DesktopLessonsContainer from "./DesktopLessonsContainer";
import moment from "moment";

class Container{
    constructor(lesson){
        this.startTime = lesson.StartDateTime;
        this.endTime = lesson.EndDateTime;
        this.columns = [
            {
                lessons: [lesson],
                columnEndTime: this.endTime
            }
        ]
    }

    containsLesson(lesson){
        return lesson.StartDateTime < this.endTime; 
    }

    addLesson(lesson){
        const lessonStartTime = lesson.StartDateTime;
        const lessonEndTime = lesson.EndDateTime;

        if(this.endTime < lessonEndTime){
            this.endTime = lessonEndTime;
        } 

        let foundColumn = false;
        let i = 0;
        while(!foundColumn && i < this.columns.length){
            const curColumn = this.columns[i];
            if(curColumn.columnEndTime <  lessonStartTime){
                curColumn.lessons.push(lesson);
                curColumn.columnEndTime = lessonEndTime;
                foundColumn = true;
            }
            i++;
        }
        
        if(!foundColumn){
            this.columns.push({
                lessons: [lesson],
                columnEndTime: lessonEndTime
            })
        }
    }
}

const DesktopTableDay = ({ dayInfo, hourLen, fromTime, ind, leftSide }) => {
    const containers = [];
    
    if(dayInfo && dayInfo.lessons){
        dayInfo.lessons.forEach((lesson) =>{
            if(containers.length === 0 || !containers[containers.length - 1].containsLesson(lesson)){
                containers.push(new Container(lesson));
            }
            else{
                containers[containers.length - 1].addLesson(lesson);
            }
        })
    }

    const today = dayInfo && dayInfo.day.isSame(moment().utc(), "day");

    return (  
        <div 
            className={"desktop-table-day" + (today ? " today" : "")}
            style={{
                gridColumn: (1 + ind)
            }}
        >
            {containers.map((content, ind) =>{
                const prevContainer= ind > 0 ? containers[ind - 1] : null;
                return <DesktopLessonsContainer 
                    key={ ind } 
                    content={ content } 
                    hourLen={ hourLen }
                    prevContainer={ prevContainer }
                    fromTime={ fromTime }
                    leftSide={ leftSide }
                />
            })}
        </div>
    );
}
 
export default DesktopTableDay;