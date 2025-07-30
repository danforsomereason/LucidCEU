import { useState, useEffect } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();

                    const input = {
                        email,
                        password,
                    };
                    const body = JSON.stringify(input);
                    const headers = {
                        "Content-Type": "application/json",
                    };
                    const init = {
                        // think of this like a trade - we're giving the email and password and we're getting back the token
                        method: "POST",
                        body,
                        headers,
                    };
                    const response = await fetch(
                        "http://localhost:5001/api/v1/users/login",
                        init
                    );
                    const output = await response.json();
                    console.log("Token: ", output);
                    localStorage.setItem("token", output.token);
                }}
            >
                <input
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
