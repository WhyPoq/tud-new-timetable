const lessonHeadingColors = {
    //in hex
    assigned: {
        "current": "#c7ffc9", // light green
        "next": "#c1ff05" // yellow
    },
    default: "transparent"
}

const getLessonHeadingColor = (lessonInfo) => {

    const now = new Date();

    if (lessonInfo.StartDateTime < now && now < lessonInfo.EndDateTime) {
        return lessonHeadingColors.assigned.current;
    }

    return lessonHeadingColors.default;
}

export default getLessonHeadingColor;