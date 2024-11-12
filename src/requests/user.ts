import axios from "axios";

export async function createUser(userData: any, password: string) {
    const response = await axios.post(
        `http://localhost:5001/api/v1/user/signup`,
        { user: userData, password }
    );
    return response.data;
}
