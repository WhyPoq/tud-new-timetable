import DesktopTableTopBar from "./DesktopTableTopBar";
import DesktopTableMain from "./DesktopTableMain";

const DesktopTimetable = ({weeks, displayedWeek, lessons, hasPrev, hasNext, loadMore, isPending}) => {
    return (
        <div className={ "desktop-timetable" + (isPending ? " pending" : "")}>
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