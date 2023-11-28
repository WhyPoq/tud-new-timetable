import { differenceInHours, parseISO, format } from "date-fns";
import getLessonColor from "../getLessonColor";

const DesktopLesson = ({ content, hourLen, prevEndTime, leftSide }) => {
    const duration = differenceInHours(
        parseISO(content.EndDateTime),
        parseISO(content.StartDateTime)
    );

    const topMargin = differenceInHours(
        parseISO(content.StartDateTime),
        prevEndTime
    );

    const startTime = format(parseISO(content.StartDateTime), "k:mm");
    const endTime = format(parseISO(content.EndDateTime), "k:mm");


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
                marginTop: topMargin * hourLen + "rem",
                "--type-color": getLessonColor(content.EventType)
            }}
        >
            <div 
                className="desktop-lesson-popup"
                style={{
                    left: leftSide ? "100%" : "auto",
                    right: leftSide ? "auto" : "100%"
                }}
            >
                <div 
                    className="desktop-lesson-inner-popup"
                    style={{
                        marginLeft: leftSide ? "1rem" : 0,
                        marginRight: leftSide ? 0 : "1rem"
                    }}
                
                >
                    <p className="time"> { startTime + "-" + endTime}</p>
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

            <div 
                className="desktop-lesson-inner"
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