import { format, parseISO } from "date-fns";
import getLessonColor from "../getLessonColor";

const MobileTimetableLesson = ({ lessonInfo }) => {

    const startTime = format(parseISO(lessonInfo.StartDateTime), "k:mm");
    const endTime = format(parseISO(lessonInfo.EndDateTime), "k:mm");

    let room = lessonInfo.Location;
    let roomDetailed = [""];
    
    if(room !== null){
        let splitPos = room.search(" ");
        if(splitPos !== -1){
            roomDetailed = room.slice(splitPos);
            room = room.slice(0, splitPos);
        }
    }

    let rooms = [];
    rooms.push({location: room, locationDetails: roomDetailed});

    if(lessonInfo.Locations !== undefined){
        rooms = lessonInfo.Locations.map((el) =>{
            let room = el.location;
            let roomDetailed = [""];
            
            if(room !== null){
                let splitPos = room.search(" ");
                if(splitPos !== -1){
                    roomDetailed = room.slice(splitPos);
                    room = room.slice(0, splitPos);
                }
            }

            return {
                nameSpecification: el.nameSpecification, 
                location: room, 
                locationDetails: roomDetailed
            };
        })
    }


    return ( 
        <div className="mobile-lesson">
            <p 
                className="lesson-type" 
                style={ {"--type-color": getLessonColor(lessonInfo.EventType)} }
            > 
                { lessonInfo.EventType }
            </p> 

            <div className="times">
                <p> { startTime }</p>
                <p> { endTime }</p>
            </div>

            <div>

            <h3 className="lesson-heading">{ lessonInfo.Description }</h3>
            <p className="lesson-long-name"> { lessonInfo.Name } </p>

            {rooms.map((room, ind) => {
                return <div key={ind}>
                    <div className="lesson-room"> 
                        <p>
                            { room.nameSpecification && room.nameSpecification + " — "}
                            { room.location } 
                        </p>
                    </div>
                    <p className="lesson-detailed-room"> { room.locationDetails && room.locationDetails } </p>
                </div>
            })}

            </div>


        </div>
    );
}
 
export default MobileTimetableLesson;