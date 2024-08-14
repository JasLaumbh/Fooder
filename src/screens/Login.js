import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://fooder-mern-app.onrender.com/api/loginuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.errors.map(err => err.msg).join(", "));
            }

            console.log("Response data:", data);
            setError(null); // Clear previous errors on success

            // Navigate to home page on successful login
            if (data.success) {
                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("authToken", data.authToken);
                console.log(localStorage.getItem("authToken"));
                navigate("/");
            }
        } catch (error) {
            console.error("Error during fetch:", error.message);
            setError(error.message);
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>

            <div className="container">
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={credentials.email}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            onChange={onChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={credentials.password}
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className="m-3 btn btn-danger">New User</Link>
                </form>
            </div>

        </div>

    );
}
