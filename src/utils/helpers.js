import moment from "moment/moment";

export const getCurWeekStartTime = () => moment().startOf("isoWeek");

const possibleEventTypes = [
	"Lecture",
	"Tutorial",
	"Laboratory",
	"Studio",
	"Kitchen",
	"Music",
	"Off-site",
	"Clinical",
];

const findMatchingEventType = (part) => {
	return (
		possibleEventTypes.find((type) => {
			const processedType = type.trim().toLowerCase();
			const processedPreLastPart = part.trim().toLowerCase();
			return processedType.includes(processedPreLastPart);
		}) || ""
	);
};

const getLastPartFromName = (lessonName) => {
	if (!lessonName) return ["", []];
	const nameParts = lessonName.split("/");
	if (nameParts.length < 1) return ["", []];
	const lastPart = nameParts[nameParts.length - 1];
	return [lastPart, nameParts];
};

const removeGroupSpecFromName = (lessonName) => {
	const [lastPart, nameParts] = getLastPartFromName(lessonName);
	if (!lastPart || lastPart.toLowerCase().includes("sem")) {
		return lessonName;
	}
	return nameParts.slice(0, nameParts.length - 1).join("/");
};

const removeSemFromName = (lessonName) => {
	const [lastPart, nameParts] = getLastPartFromName(lessonName);
	if (!lastPart || !lastPart.toLowerCase().includes("sem")) {
		return lessonName;
	}
	return nameParts.slice(0, nameParts.length - 1).join("/");
};

const removeEventTypeFromName = (lessonName) => {
	lessonName = removeGroupSpecFromName(lessonName);
	const [lastPart, nameParts] = getLastPartFromName(lessonName);
	if (!lastPart || !findMatchingEventType(lastPart)) {
		return lessonName;
	}
	return nameParts.slice(0, nameParts.length - 1).join("/");
};

export const predictLessonType = (lessonName) => {
	lessonName = removeGroupSpecFromName(lessonName);

	const nameParts = lessonName.split("/");
	if (nameParts.length < 2) return "";
	const preLastPart = nameParts[nameParts.length - 2];
	const eventType = findMatchingEventType(preLastPart);
	return eventType;
};

const capitalizeFirstLetter = (val) => {
	if (!val || val.length === 0) return val;
	return val.charAt(0).toUpperCase() + String(val).slice(1);
};

export const predictLessonShortName = (lessonName) => {
	lessonName = removeGroupSpecFromName(lessonName);
	lessonName = removeSemFromName(lessonName);
	lessonName = removeEventTypeFromName(lessonName);
	let [lastPart] = getLastPartFromName(lessonName);
	lastPart = String(lastPart).trim();
	return capitalizeFirstLetter(lastPart);
};

//fix for a bad written lessons information
//what to replace: with what to replace
const replaceFix = {
	Systesm: "Systems",
	Devleopment: "Development",
};

export const fixDescr = (description) => {
	for (const key in replaceFix) {
		description = description.replaceAll(key, replaceFix[key]);
	}
	return description;
};
