import jwt from "jsonwebtoken";
import User from "../models/User";

export default async function authenticate(authorization?: string) {
    if (!authorization) {
        throw new Error("No authorization header");
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, "TEST_SECRET");
        if (typeof decoded !== "object") {
            throw new Error("Decoded is not an object");
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw new Error("Invalid Token");
    }
}
