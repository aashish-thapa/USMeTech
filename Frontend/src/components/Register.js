import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    contact: "",
    password: "",
  });
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
      const response = await fetch(`http://localhost:5000/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setMessage("🎉 Registration successful! You can now log in.");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("Error registering.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg sm:w-96 md:w-1/2">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
          <input type="text" name="studentId" placeholder="Student ID" onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
          <input type="text" name="contact" placeholder="Contact" onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
          <button type="submit" className="w-full p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Register</button>
          <a href="/login" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-white-200">Login</a>
        </form>

        {message && <p className={`mt-4 text-center ${success ? "text-green-500" : "text-red-500"}`}>{message}</p>}

        {success && (
          <button onClick={() => navigate("/login")} className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Register;
