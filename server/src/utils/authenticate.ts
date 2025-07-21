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

export default async function authenticate(
    authorization?: string,
    debug?: boolean
) {
    if (debug) {
        console.debug("Authorization header:", authorization);
    }
    if (!authorization) {
        if (debug) {
            console.debug("Authorization header missing");
        }
        return undefined;
    }
    const token = authorization.split(" ")[1];
    if (debug) {
        console.debug("Token at authenticate fx:", token);
    }
    const decoded = verify(token);
    if (debug) {
        console.debug("Decoded at authenticate fx:", decoded);
    }
    if (!decoded) {
        if (debug) {
            console.debug("Decoded empty token");
        }
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
