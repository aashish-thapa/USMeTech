import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setMessage("✅ Login successful! Redirecting...");
        login({
          id: data.user._id,
          name: `${data.user.firstName} ${data.user.lastName}`,
          email: data.user.email,
        });
        setTimeout(() => navigate("/home"), 1500); // Redirect after success
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Error logging in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg sm:w-96 md:w-1/2">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
          <button type="submit" className="w-full p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Login</button>
        </form>

        {message && <p className={`mt-4 text-center ${success ? "text-green-500" : "text-red-500"}`}>{message}</p>}

        <p className="text-gray-500 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-yellow-500 hover:text-gray-900">
            Register here
          </a>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
