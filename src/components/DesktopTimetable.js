import DesktopTableTopBar from "./DesktopTableTopBar";
import DesktopTableMain from "./DesktopTableMain";

const DesktopTimetable = ({weeks, displayedWeek, lessons, hasPrev, hasNext, loadMore}) => {
    return (
        <div className="desktop-timetable">
            <DesktopTableTopBar 
                weeks={ weeks }
                displayedWeek={ displayedWeek }
                hasPrev={ hasPrev }
                hasNext={ hasNext }
                loadMore={ loadMore }
            />
            <DesktopTableMain 
                weeks={ weeks }
                displayedWeek={ displayedWeek }
                lessons={ lessons }
            />
        </div>
    );
}
 
export default DesktopTimetable;