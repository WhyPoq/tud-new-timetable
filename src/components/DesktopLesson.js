import { differenceInHours, parseISO, format } from "date-fns";
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

    const startTime = format(parseISO(content.StartDateTime), "k:mm");

    let room = content.Location;
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

    if(content.Locations !== undefined){
        rooms = content.Locations.map((el) =>{
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
        <div 
            className="desktop-lesson"
            style={{
                height: duration * hourLen + "rem",
                marginTop: topMargin * hourLen + "rem"
            }}
        >
            <div 
                className="desktop-lesson-inner"
                style={ {"--type-color": getLessonColor(content.EventType)} }
            >
                <div  className="desktop-lesson-type"></div>

                <div className="desktop-lesson-info">
                    <p className="time"> { startTime }</p>

                    <h3 className="lesson-heading">{ content.Description }</h3>
                    <p className="lesson-long-name"> { content.Name } </p>

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
            
        </div>
    );
}
 
export default DesktopLesson;