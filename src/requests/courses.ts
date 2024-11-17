import axios from "axios";

export async function getCourses(query?: string) {
    try {
        const url = `http://localhost:5001/api/v1/courses${query || ""}`;
        console.log("Making request to:", url);

        const response = await axios.get(url);
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}
