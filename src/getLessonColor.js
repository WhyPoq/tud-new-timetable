const lessonColors = {
    //in hsl
    assigned: {
        "lecture": "206, 100%, 50%",
        "tutorial": "108, 79%, 51%",
        "laboratory": "286, 100%, 55%",
        "studio": "44, 100%, 48%",
        "kitchen": "71, 94%, 42%",
        "music": "324, 100%, 48%",
        "off-site": "335, 100%, 48%",
        "clinical": "355, 100%, 71%"
    },
    default: "198, 100%, 21%"
}

const getLessonColor = (lessonType) => {
    lessonType = lessonType.toLowerCase();

    for (const [key, value] of Object.entries(lessonColors.assigned)) {
        if(lessonType.includes(key.toLowerCase())){
            return value;
        }
    }

    return lessonColors.default;
}

export default getLessonColor;