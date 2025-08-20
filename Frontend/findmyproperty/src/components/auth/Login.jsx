import axios from "axios";
import { useState } from "react";
import { useAuth } from "./useAuth";
import './auth.css';

export default function Login({ onSwitch, onSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8080/users/signin", {
                email,
                password,
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const token = response.data?.jwt;

            if (typeof token === "string" && token.split('.').length === 3) {
                // ✅ Store token for future requests
                localStorage.setItem("jwt", token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // ✅ Optional: store in context
                login(token);

                // ✅ Pass raw token to parent (Navbar)
                onSuccess(token);
            } else {
                console.error("Invalid token format:", token);
                setError("Login failed: Invalid token received");
            }

        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="auth-form">
            <h2>Welcome Back!</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
            </form>
            <p>
                New here? <button className="auth-switch" onClick={onSwitch}>Sign Up</button>
            </p>
        </div>
    );
}