import { useState } from "react";
import axios from "axios";
import './auth.css';

export default function Signup({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const { name, username, email, password } = formData;
    if (!name || !username || !email || !password) {
      return "All fields are required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email format";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:8080/users/signup", {
        ...formData,
        contactNo: "9999999999",
        dob: "1990-01-01",
        role: "GUEST",
        address: {
          lineOne: "123 Main Street",
          lineTwo: "Apt 4B",
          city: "Pune",
          state: "MH",
          zipCode: "411001"
        }
      });
      onSwitch(); // Switch to login view
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already a member?{" "}
        <button className="auth-switch" onClick={onSwitch}>
          Log In
        </button>
      </p>
    </div>
  );
}