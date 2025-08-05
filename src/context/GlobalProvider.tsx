import { ReactNode, useEffect, useState } from "react";
import { globalContext, GlobalValue } from "./globalContext";
import { User } from "../../server/src/models/User";

interface GlobalProviderProps {
    children: ReactNode;
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
    const localToken = localStorage.getItem("token");
    // console.log("localUser", localUser);

    // ?? "" removed from parse
    // changed from parseUser = JSON.parse(localUser);
    const [currentUser, setCurrentUser] = useState<User>();
    const [currentUserLoading, setCurrentUserLoading] = useState(true);

    const [token, setToken] = useState(localToken ?? undefined);
    useEffect(() => {
        async function identify() {
            if (!token) {
                setCurrentUserLoading(false);
                return;
            }
            const response = await fetch(
                "http://localhost:5001/api/v1/users/identify",
                { headers: { authorization: `Bearer ${token}` } }
            );
            const output = await response.json();
            console.log("output:", output);
            if (!output.user) {
                localStorage.removeItem("token");
            }
            setCurrentUser(output.user);
            setCurrentUserLoading(false);
        }
        identify();
    }, []);

    const globalValue: GlobalValue = {
        currentUser,
        setCurrentUser,
        token,
        setToken,
        currentUserLoading,
    };

    return (
        <globalContext.Provider value={globalValue}>
            {children}
        </globalContext.Provider>
    );
}
