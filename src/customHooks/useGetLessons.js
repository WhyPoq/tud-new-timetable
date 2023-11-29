import { useState, useEffect } from "react";

import { compareAsc, parseISO, startOfDay,
    isEqual, startOfWeek, endOfWeek, formatISO9075, eachDayOfInterval, isSameDay } from "date-fns"

function addEmptyDays(days, weekStart){
    const rangeStart = startOfWeek(parseISO(weekStart), 
    { weekStartsOn: 1 });
    const rangeEnd = endOfWeek(parseISO(weekStart), 
    { weekStartsOn: 1 });
    const allDays = eachDayOfInterval({ start: rangeStart, end: rangeEnd });
    
    let curFilledDay = 0;
    const newDays = allDays.map((curDay) =>{
        if(curFilledDay < days.length && 
            isSameDay(curDay, days[curFilledDay].day)){
            curFilledDay++;
            return days[curFilledDay - 1];
        }

        return {
            day: curDay,
            lessons: []
        }
    })
    return newDays;
}

function collapseLabGroups(days){

    function splitLessonName(lesson){
        let nameBase = "";
        let nameSpec = "";

        if(lesson.collapsedLocations){
            return [lesson.Name, ""];
        }

        let splitNameIndex = lesson.Name.lastIndexOf("/");
        if(splitNameIndex !== -1){
            nameBase = lesson.Name.slice(0, splitNameIndex);
            nameSpec = lesson.Name.slice(splitNameIndex + 1);
        }

        return [nameBase, nameSpec];
    }

    function isSameLesson(lesson1, lesson2){
        if(lesson1.Description === lesson2.Description
            && isEqual(parseISO(lesson1.EndDateTime), 
                parseISO(lesson2.EndDateTime))
            && isEqual(parseISO(lesson1.StartDateTime), 
                parseISO(lesson2.StartDateTime))
            && lesson1.EventType === lesson2.EventType)
        {   
            const [nameBase1] = splitLessonName(lesson1); 
            const [nameBase2] = splitLessonName(lesson2); 
            return nameBase1 === nameBase2;
        }
        return false;
    }

    days.forEach(day =>{
        if(day.lessons.length !== 0){

            day.lessons.forEach(lesson =>{
                lesson.collapsedLocations = false;
            });

            let collapsingLesson = day.lessons[0];
            const collapsedLessons = [];
            for(let i = 1; i < day.lessons.length; i++){
                const curLesson = day.lessons[i];

                if(isSameLesson(collapsingLesson, curLesson)){
                    const [, curNameSpec] = splitLessonName(curLesson);

                    if(!collapsingLesson.collapsedLocations){
                        const [collapsingNameBase, collapsingNameSpec] = 
                            splitLessonName(collapsingLesson);

                        collapsingLesson.collapsedLocations = true;
                        
                        collapsingLesson.Name = collapsingNameBase;
                        collapsingLesson.Locations = [{
                            nameSpecification: collapsingNameSpec,
                            location: collapsingLesson.Location
                        }];
                    }

                    collapsingLesson.Locations.push({
                        nameSpecification: curNameSpec,
                        location: curLesson.Location
                    });
                }
                else{
                    collapsedLessons.push(collapsingLesson);
                    collapsingLesson = curLesson;
                }
            }

            collapsedLessons.push(collapsingLesson);
            day.lessons = collapsedLessons;
        }
    });

    return days;
}

function organizeLessons(lessons){
    if(lessons.CategoryEvents.length === 0){
        return [];
    }

    lessons = lessons.CategoryEvents[0].Results.map((el) => {
    const {StartDateTime, EndDateTime, Location, Description, Name, EventType} = el;
    return {StartDateTime, EndDateTime, Location, Description, Name, EventType};
    })

    lessons = lessons.sort((a, b) => {
        return compareAsc(parseISO(a.StartDateTime), parseISO(b.StartDateTime));
    });

    let organizedLessons = [];

    for(let i = 0; i < lessons.length; i++){
        const curLessonDay = startOfDay(parseISO(lessons[i].StartDateTime));
        if(organizedLessons.length === 0 || 
            !isEqual(organizedLessons[organizedLessons.length - 1].day, curLessonDay)){
            
            organizedLessons.push({
                day: curLessonDay,
                lessons: []
            });
        }

        organizedLessons[organizedLessons.length - 1].lessons.push(lessons[i]);
    }

    organizedLessons = collapseLabGroups(organizedLessons);

    return organizedLessons;
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

        const startRange = startOfWeek(parseISO(weeks[displayedWeek].FirstDayInWeek), 
            { weekStartsOn: 1 });
        const endRange = endOfWeek(parseISO(weeks[displayedWeek].FirstDayInWeek), 
            { weekStartsOn: 1 });

        const lessonsUrl = "https://tudublin-v4-d4-01.azurewebsites.net/api/Public/CategoryTypes/Categories/Events/Filter/50a55ae1-1c87-4dea-bb73-c9e67941e1fd";
        const requestUrl= lessonsUrl + "?startRange=" + formatISO9075(startRange) + "&endRange=" + formatISO9075(endRange);

        console.log(requestUrl);

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