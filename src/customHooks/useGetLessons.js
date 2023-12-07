import { useState, useEffect } from "react";

import constants from "../constants";
import moment from 'moment';
import collapseLabGroups from "../collapseLabGroups";

    
//ads days for each day of the week even if there are no lessons that day
function addEmptyDays(days, weekStart){
    const rangeStart = weekStart.clone().startOf("isoWeek");
    const rangeEnd = weekStart.clone().endOf("isoWeek")
    
    var currentDate = rangeStart.clone();
    const newDays = [];
    let curFullDayInd = 0;

    while (currentDate.isSameOrBefore(rangeEnd, "day")) {
        if(curFullDayInd < days.length && currentDate.isSame(days[curFullDayInd].day, "day")){
            newDays.push(days[curFullDayInd]);
            curFullDayInd++;
        }
        else{
            newDays.push({
                day: currentDate.clone(),
                lessons: []
            });
        }

        currentDate.add(1, 'day');
    }

    return newDays;
}

//removes unnecessary field from lesson objects which were returned from database + sorting them and collapsing lab groups
function organizeLessons(lessons){

    //something went wong and lessons were not returned (or there are no lessons in that period)
    if(lessons.CategoryEvents.length === 0){
        return [];
    }

    //get needed fields
    lessons = lessons.CategoryEvents[0].Results.map((el) => {
        const {StartDateTime : _StartDateTime, EndDateTime : _EndDateTime, Location, Description, Name, EventType} = el;
        const StartDateTime = moment.utc(_StartDateTime);
        const EndDateTime = moment.utc(_EndDateTime);

        return {StartDateTime, EndDateTime, Location, Description, Name, EventType};
    })

    lessons = lessons.sort((a, b) => {
        return a.StartDateTime - b.StartDateTime;
    });


    let daysWithLessons = [];

    //folde lessons into days
    for(let i = 0; i < lessons.length; i++){
        const curLessonDay = lessons[i].StartDateTime.clone().startOf("day");
        if(daysWithLessons.length === 0 || !daysWithLessons[daysWithLessons.length - 1].day.isSame(curLessonDay, "day")){
                daysWithLessons.push({
                day: curLessonDay,
                lessons: []
            });
        }

        daysWithLessons[daysWithLessons.length - 1].lessons.push(lessons[i]);
    }

    daysWithLessons = collapseLabGroups(daysWithLessons);

    return daysWithLessons;
}  



export const useGetLessons = (selectedProgram, weeks, displayedWeek, setDisplayedWeek, curWeekRef, isMobile) => {

    function getReqBody(selectedProgram){
        return selectedProgram === null ? null : {
            "ViewOptions": {
                "Days": [
                    {"DayOfWeek": 1},
                    {"DayOfWeek": 2},
                    {"DayOfWeek": 3},
                    {"DayOfWeek": 4},
                    {"DayOfWeek": 5},
                    {"DayOfWeek": 6}
                ]
            },
            "CategoryTypesWithIdentities": [
                {
                    "CategoryTypeIdentity": selectedProgram.CategoryTypeIdentity,
                    "CategoryIdentities": [
                        selectedProgram.Identity
                    ]
                }
            ],
            "FetchBookings": false,
            "FetchPersonalEvents": false,
            "PersonalIdentities": []
        }
    }

    const [lessons, setLessons] = useState([]);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
    const [loadedWeeks, setLoadedWeeks] = useState({});
    const [reset, setReset] = useState(false);


    useEffect(() =>{
        setLessons([]);
        setLoadedWeeks({});
        setDisplayedWeek(curWeekRef.current);
    }, [selectedProgram, setDisplayedWeek, curWeekRef]);

    useEffect(() =>{
        if(reset){
            setLessons([]);
            setLoadedWeeks({});
            setReset(false);
        }
    }, [reset, curWeekRef, setDisplayedWeek]);

    useEffect(() =>{
        setLessons([]);
        setLoadedWeeks({});

        if(isMobile){
            setDisplayedWeek(curWeekRef.current);
        }
    }, [isMobile, setDisplayedWeek, curWeekRef]);

    useEffect(() => {
        if(weeks.length === 0 || displayedWeek === -1 || 
            selectedProgram === null){
            return;
        }

        if(loadedWeeks[displayedWeek] === true){
            return;
        }

        const updatedLoadedWeeks = isMobile ? {...loadedWeeks} : {};
        if(!isMobile){
            setLessons([]);
        }
        updatedLoadedWeeks[displayedWeek] = true;
        setLoadedWeeks(updatedLoadedWeeks);

        const startRange = weeks[displayedWeek].FirstDayInWeek.clone().startOf("isoWeek");
        const endRange = weeks[displayedWeek].FirstDayInWeek.clone().endOf("isoWeek");


        const lessonsUrl = `https://${constants.database_name}.azurewebsites.net/api/Public/CategoryTypes/Categories/Events/Filter/50a55ae1-1c87-4dea-bb73-c9e67941e1fd`;
        const requestUrl= lessonsUrl + "?startRange=" + startRange.toISOString() + "&endRange=" + endRange.toISOString();

        const req = { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getReqBody(selectedProgram))
        };

        setIsPending(true);
        fetch(requestUrl, req)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                let error = new Error('Network response was NOT ok');
                setError(error);
                setIsPending(false);
                throw new Error('Network response was NOT ok');
            }
        })
        .then(json => {
            const organizedLessons = organizeLessons(json);
            const newLessons = addEmptyDays(organizedLessons, weeks[displayedWeek].FirstDayInWeek);
            
            setLessons(prevLessons => {
                return isMobile ? [...prevLessons, ...newLessons] : newLessons
            });
            setError(null);
            setIsPending(false);
        })
        .catch(error => {
            console.error('Error while fetching lessons:', error);
            setError(error);
            setIsPending(false);
        });

    }, [weeks, displayedWeek, selectedProgram, loadedWeeks, isMobile]);

    return [lessons, isPending, error, setReset];
};