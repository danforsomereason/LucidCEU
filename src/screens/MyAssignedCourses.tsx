import { useEffect, useState, useContext } from "react";
import {
    RelatedAssignedCourse,
    RelatedAssignedCourseZod,
} from "../../server/src/models/AssignedCourse";
import { globalContext } from "../context/globalContext";

export default function MyAssignedCourses() {
    const [courses, setCourses] = useState<RelatedAssignedCourse[]>([]);
    const global = useContext(globalContext);

    useEffect(() => {
        async function download() {
            const response = await fetch(
                "http://localhost:5001/api/v1/assigned_courses/titles",
                {
                    headers: { authorization: `Bearer ${global?.token}` },
                }
            );
            // unknown is like any - anything can b e assigned to it
            // but nothing can be done with it
            const data: unknown = await response.json();
            const myCourses = RelatedAssignedCourseZod.array().parse(data);
            setCourses(myCourses);
        }
        download();
    }, []);

    return (
        <ol>
            {courses.map((course) => (
                <li key={course.course_id._id}>
                    <p>{course.course_id.course_name}</p>
                    <button>Continue</button>
                </li>
            ))}
        </ol>
    );
}
