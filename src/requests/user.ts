import axios from "axios";
import mongoose from "mongoose";

export async function createUser(userData: any, password: string) {
    const response = await axios.post(
        `http://localhost:5001/api/v1/users/signup`,
        { user: userData, password }
    );
    // move this to the login function
    // localStorage.setItem("token", response.data.token);
    return response.data;
}

export async function login(email: string, password: string) {
    // Make a POST request to the login endpoint
    const response = await axios.post(
        `http://localhost:5001/api/v1/users/login`,
        { email, password }
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("currentUser", JSON.stringify(response.data.user));
    return response.data;
}

export async function updateUser(userData: any) {
    const response = await axios.put(
        `http://localhost:5001/api/v1/users/update`,
        userData
    );
    return response.data;
}

// used onBlur to check if email exists in users collection
export async function checkUserExists(email: string) {
    const response = await axios.get(
        `http://localhost:5001/api/v1/users/check-exists/${email}`
    );
    return response.data;
}

// check if email & organization id exists in verified_users collection
export async function checkOrganizationVerification(email: string) {
    const response = await axios.get(
        `http://localhost:5001/api/v1/users/check-verification/${email}`
    );
    return response.data;
}

// For registered organization users (immediate creation)
export async function createOrganizationUser(userData: any, password: string) {
    const response = await axios.post(
        `http://localhost:5001/api/v1/users/signup/organization`,
        { user: userData, password }
    );
    return response.data;
}

// For personal users (after payment)
export async function createPersonalUser(
    userData: any,
    password: string,
    paymentIntent: string
) {
    const response = await axios.post(
        `http://localhost:5001/api/v1/users/signup/personal`,
        {
            user: userData,
            password,
            paymentIntent, // Stripe payment intent ID for verification
        }
    );
    return response.data;
}
