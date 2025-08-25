//merges same lesson for different groups to a one lesson with different rooms fro each group
function collapseLabGroups(days) {
	//splits lesson code into lab group and the rest - base name
	function splitLessonName(lesson) {
		let nameBase = "";
		let nameSpec = "";

		if (lesson.collapsedLocations) {
			return [lesson.Name, ""];
		}

		let splitNameIndex = lesson.Name.lastIndexOf("/");
		if (splitNameIndex !== -1) {
			nameBase = lesson.Name.slice(0, splitNameIndex);
			nameSpec = lesson.Name.slice(splitNameIndex + 1);
		}

		return [nameBase, nameSpec];
	}

	function isSameLesson(lesson1, lesson2) {
		if (
			lesson1.StartDateTime.isSame(lesson2.StartDateTime) &&
			lesson1.EndDateTime.isSame(lesson2.EndDateTime) &&
			lesson1.EventType === lesson2.EventType
		) {
			const [nameBase1] = splitLessonName(lesson1);
			const [nameBase2] = splitLessonName(lesson2);

			//almost always compare for descriptions but sometimes descriptions are wrong but base names are rights
			return lesson1.Description === lesson2.Description || nameBase1 === nameBase2;
		}
		return false;
	}

	days.forEach((day) => {
		if (day.lessons.length !== 0) {
			day.lessons.forEach((lesson) => {
				lesson.collapsedLocations = false;
			});

			let collapsingLesson = day.lessons[0];
			const collapsedLessons = [];
			for (let i = 1; i < day.lessons.length; i++) {
				const curLesson = day.lessons[i];

				if (isSameLesson(collapsingLesson, curLesson)) {
					const [, curNameSpec] = splitLessonName(curLesson);

					if (!collapsingLesson.collapsedLocations) {
						const [collapsingNameBase, collapsingNameSpec] =
							splitLessonName(collapsingLesson);

						collapsingLesson.collapsedLocations = true;

						if (!collapsingNameSpec.toLowerCase().includes("sem")) {
							collapsingLesson.Name = collapsingNameBase;
						}

						collapsingLesson.Locations = [
							{
								nameSpecification: collapsingNameSpec.toLowerCase().includes("sem")
									? null
									: collapsingNameSpec,
								location: collapsingLesson.Location,
								staffName: collapsingLesson.staffName,
							},
						];
					}

					collapsingLesson.Locations.push({
						nameSpecification: curNameSpec.toLowerCase().includes("sem")
							? null
							: curNameSpec,
						location: curLesson.Location,
						staffName: curLesson.staffName,
					});
				} else {
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

export default collapseLabGroups;
