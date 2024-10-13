import axios from "axios";

export async function getCourseCategories() {
    const response = await axios.get(`http://localhost:5001/api/v1/course_categories`);
    return response.data;
}
