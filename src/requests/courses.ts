import axios from "axios";

export async function getCourses(query?: string) {
    const q = query ? `?${query}` : '';
    const response = await axios.get(`http://localhost:5001/api/v1/courses${q}`);
    return response.data;
}

