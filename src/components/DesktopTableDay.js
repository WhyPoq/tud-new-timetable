import DesktopLessonsContainer from "./DesktopLessonsContainer";
import { parseISO, compareAsc} from "date-fns"

class Container{
    constructor(lesson){
        this.startTime = parseISO(lesson.StartDateTime);
        this.endTime = parseISO(lesson.EndDateTime);
        this.columns = [
            {
                lessons: [lesson],
                columnEndTime: this.endTime
            }
        ]
    }

    containsLesson(lesson){
        return compareAsc(parseISO(lesson.StartDateTime), this.endTime) < 0; 
    }

    addLesson(lesson){
        const lessonStartTime = parseISO(lesson.StartDateTime);
        const lessonEndTime = parseISO(lesson.EndDateTime);

        if(compareAsc(this.endTime, lessonEndTime) < 0){
            this.endTime = lessonEndTime;
        } 

        let foundColumn = false;
        let i = 0;
        while(!foundColumn && i < this.columns.length){
            const curColumn = this.columns[i];
            if(compareAsc(curColumn.columnEndTime, lessonStartTime) <= 0){
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

const DesktopTableDay = ({ dayInfo, hourLen, fromTime, ind }) => {
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

    return (  
        <div 
            className="desktop-table-day"
            style={{
                gridColumn: (2 + ind),
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
                />
            })}
        </div>
    );
}
 
export default DesktopTableDay;