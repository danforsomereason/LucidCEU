import axios from "axios";

export async function createOrganization(organizationData: any, password: string) {
    try {
        const response = await axios.post(
            `http://localhost:5001/api/v1/organizations`,
            { organization: organizationData, password }
        );
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        console.error("Error creating organization:", error);
        throw error;
    }
}
