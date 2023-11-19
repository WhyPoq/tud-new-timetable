import { format, parseISO } from "date-fns";

const lessonColors = {
    assigned: {
        "lecture": "#318FFF",
        "tutorial": "#5EF638",
        "laboratory": "#C92FFF"
    },
    default: "#004C6C"
}

function getLessonColor(lessonType){
    lessonType = lessonType.toLowerCase();

    for (const [key, value] of Object.entries(lessonColors.assigned)) {
        if(lessonType.includes(key.toLowerCase())){
            return value;
        }
    }

    return lessonColors.default;
}

const TimetableLesson = ({ lessonInfo }) => {


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
        <div className="lesson">
            <p 
                className="lesson-type" 
                style={ {backgroundColor: getLessonColor(lessonInfo.EventType)} }
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
 
export default TimetableLesson;