import { useState, useEffect } from "react";

export default function Register() {
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
                        first_name: "Dan",
                        last_name: "Hutch",
                        role: "admin",
                        license_type: "LPC",
                        isAdmin: true,
                    };
                    const body = JSON.stringify(input);
                    const headers = {
                        "Content-Type": "application/json",
                    };
                    const init = {
                        method: "POST",
                        body,
                        headers,
                    };
                    const response = await fetch(
                        "http://localhost:5001/api/v1/users/signup",
                        init
                    );
                    const output = await response.json();
                    console.log(output);
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
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
