import DesktopTableTopBar from "./DesktopTableTopBar";
import DesktopTableMain from "./DesktopTableMain";

const DesktopTimetable = ({weeks, displayedWeek, hasPrev, hasNext, loadMore}) => {
    return (
        <div className="desktop-timetable">
            <DesktopTableTopBar 
                weeks={ weeks }
                displayedWeek={ displayedWeek }
                hasPrev={ hasPrev }
                hasNext={ hasNext }
                loadMore={ loadMore }
            />
            <DesktopTableMain />
        </div>
    );
}
 
export default DesktopTimetable;