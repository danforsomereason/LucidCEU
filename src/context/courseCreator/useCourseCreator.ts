import { CourseCreatorContext } from "./CourseCreatorContext";
import { useContext } from "react";

export default function useCourseCreator() {
    const courseCreator = useContext(CourseCreatorContext);
    if (!courseCreator) {
        throw new Error("useCourseCreator must be used inside a provider");
    }
    return courseCreator;
}
