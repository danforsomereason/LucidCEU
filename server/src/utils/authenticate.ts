import jwt from "jsonwebtoken";
import User from "../models/User";

function verify(token: string) {
    try {
        const decoded = jwt.verify(token, "TEST_SECRET");
        return decoded;
    } catch (error) {
        return undefined;
    }
}

export default async function authenticate(authorization?: string) {
    if (!authorization) {
        return undefined;
    }
    const token = authorization.split(" ")[1];
    const decoded = verify(token);
    if (!decoded) {
        return undefined;
    }

    if (typeof decoded !== "object") {
        throw new Error("Decoded is not an object");
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}
