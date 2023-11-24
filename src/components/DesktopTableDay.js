import { format} from "date-fns"

const DesktopTableDay = ({ dayInfo }) => {
    console.log(dayInfo);
    return (  
        <div className="desktop-table-day">
            {dayInfo && format(dayInfo.day, "MMMM d")}
            {dayInfo.lessons.map((el, ind) =>{
                return <div key={ ind }>{ el.Description }</div>
            })}
        </div>
    );
}
 
export default DesktopTableDay;