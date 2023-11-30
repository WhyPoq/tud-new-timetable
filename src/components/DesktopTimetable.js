import DesktopTableTopBar from "./DesktopTableTopBar";
import DesktopTableMain from "./DesktopTableMain";

const DesktopTimetable = ({weeks, displayedWeek, lessons, hasPrev, hasNext, 
        loadMore, isPending, setReset, toToday, error}) => {
    return (
        <div className={ "desktop-timetable" + (isPending ? " pending" : "")}>
            <DesktopTableTopBar 
                weeks={ weeks }
                displayedWeek={ displayedWeek }
                hasPrev={ hasPrev }
                hasNext={ hasNext }
                loadMore={ loadMore }
                setReset={ setReset }
                toToday={ toToday }
            />
            <DesktopTableMain 
                weeks={ weeks }
                displayedWeek={ displayedWeek }
                lessons={ lessons }
                isPending={ isPending }
                error={ error }
            />
        </div>
    );
}
 
export default DesktopTimetable;