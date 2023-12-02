import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";

export const useGetWeeks = () => {
    const requestUrl = "https://tudublin-v4-d4-01.azurewebsites.net/api/Public/ViewOptions/50a55ae1-1c87-4dea-bb73-c9e67941e1fd";
    const [timePeriods, isPending, error] = useFetch(requestUrl);

    const [weeks, setWeeks] = useState([]);
    useEffect(() =>{
        setWeeks(timePeriods ? timePeriods.Weeks.map((el) => {
            const { WeekNumber, FirstDayInWeek : _firstDayInWeek } = el;
            const FirstDayInWeek = new Date(_firstDayInWeek);
            return { WeekNumber, FirstDayInWeek };
        }) : []);
    }, [timePeriods]);

    return [weeks, isPending, error];
};