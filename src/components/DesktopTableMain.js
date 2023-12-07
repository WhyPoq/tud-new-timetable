import DesktopTableTimes from "./DesktopTableTimes";
import DesktopTableWeekdays from "./DesktopTableWeekdays";
import DesktopTableLessons from "./DesktopTableLessons";

import { useState, useRef, useEffect } from "react";

const DesktopTableMain = ({ weeks, displayedWeek, lessons, isPending, error }) => {
    const hourLen = 10;
    const fromTime = 8;
    const endTime = 22;

    const weekLength = 6;
    let fromDate = null;
    let toDate = null;

    const daysDates = [];
    for (let i = 0; i < weekLength; i++) {
        daysDates.push(null);
    }

    if (displayedWeek !== -1 && weeks.length > 0 && weeks[displayedWeek]) {
        fromDate = weeks[displayedWeek].FirstDayInWeek.clone().startOf("week");
        toDate = fromDate.clone().add(weekLength - 1, "days").endOf("day");

        for (let i = 0; i < weekLength; i++) {
            daysDates[i] = fromDate.clone().add(i, "days");
        }
    }

    const timeColumnRef = useRef(null);
    const [timeColumnWidth, setTimeColumnWidth] = useState(0);

    const scrollablePartRef = useRef(null);
    const [lessonsScrollWidth, setLessonsScrollWidth] = useState(0);
    const scrollableContentRef = useRef(null);

    useEffect(() => {
        const measureWidth = () => {
            if (timeColumnRef.current) {
                setTimeColumnWidth(timeColumnRef.current.getBoundingClientRect().width);
            }
        };

        const measureScrollWidth = () => {
            if (scrollablePartRef.current && scrollableContentRef.current) {
                const scrollbarWidth = scrollablePartRef.current.getBoundingClientRect().width -
                scrollableContentRef.current.getBoundingClientRect().width;

                setLessonsScrollWidth(scrollbarWidth);
            }
        };


        let observerTimes;
        let observerScroll;

        let timeoutTimes;
        let timeoutScroll;

        //is observer is suported
        if ('ResizeObserver' in window) {
            if (timeColumnRef.current) {
                // Create a ResizeObserver to listen to size changes
                observerTimes = new ResizeObserver((entries) => {
                    if (entries[0].target === timeColumnRef.current) {
                        measureWidth();
                    }
                });

                // Start observing the time column
                observerTimes.observe(timeColumnRef.current);
            }

            if (scrollablePartRef.current) {
                // Create a ResizeObserver to listen to size changes
                observerScroll = new ResizeObserver((entries) => {
                    if (entries[0].target === scrollablePartRef.current) {
                        measureScrollWidth();
                    }
                });

                // Start observing the time column
                observerScroll.observe(scrollablePartRef.current);
            }
        }
        timeoutTimes = setTimeout(measureWidth, 100);
        timeoutScroll = setTimeout(measureScrollWidth, 100);

        return () => {
            // Disconnect the observer on cleanup
            if (observerTimes) {
                observerTimes.disconnect();
            }
            if (observerScroll) {
                observerScroll.disconnect();
            }

            if (timeoutTimes) {
                clearTimeout(timeoutTimes);
            }
            if (timeoutScroll) {
                clearTimeout(timeoutScroll);
            }
        };
    }, []);

    return (
        <div className="desktop-table-main">

            <DesktopTableWeekdays
                daysDates={daysDates}
                firstColumnWidth={timeColumnWidth}
                lastColumnWidth={lessonsScrollWidth}
            />

            <div
                className="desktop-table-scrollable"
                ref={scrollablePartRef}
                style={{
                    gridTemplateRows: (endTime - fromTime) * hourLen + "rem"
                }}
            >
                <div className="desktop-table-scrollable-inner" ref={scrollableContentRef}>
                    <DesktopTableTimes
                        hourLen={hourLen}
                        fromTime={fromTime}
                        endTime={endTime}
                        ref={timeColumnRef}
                    />

                    <DesktopTableLessons
                        lessons={lessons}
                        fromDate={fromDate}
                        toDate={toDate}
                        hourLen={hourLen}
                        fromTime={fromTime}
                        endTime={endTime}
                        weekLength={weekLength}
                        isPending={ isPending }
                        error={ error }
                    />
                </div>
            </div>

        </div>
    );
}

export default DesktopTableMain;