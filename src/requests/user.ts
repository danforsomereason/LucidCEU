import axios from "axios";

export async function createUser(userData: any, password: string) {
    const response = await axios.post(
        `http://localhost:5001/api/v1/user/signup`,
        { user: userData, password }
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
}

export async function login(email: string, password: string) {
    const response = await axios.post(`http://localhost:5001/api/v1/user/login`, { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
}