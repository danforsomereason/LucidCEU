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

export async function getCourseById(courseId: string) {
    try {
        const cleanId = courseId.replace(/^\/+|\/+$/g, '');
        const url = `http://localhost:5001/api/v1/courses/${cleanId}`;
        console.log('Attempting to fetch course with URL:', url);
        
        const response = await axios.get(url);
        console.log('Successful response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error details:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url
        });
        throw error;
    }
}
