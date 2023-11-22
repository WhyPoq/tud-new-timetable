const DesktopTableBarTop = ({ weeks, displayedWeek }) => {
    return ( 
        <div className="desktop-table-bar-top">
            <div>
                <button>{'<'}</button>
                <button>{'>'}</button>
            </div>
            <p className="desktop-table-bar-top-date"></p>
            <div className="desktop-table-bar-top-week">

            </div>
        </div>
    );
}
 
export default DesktopTableBarTop;