import axios from "axios";

export async function createUser() {
    const response = await axios.post(`http://localhost:5001/api/v1/user`);
    return response.data;
}
