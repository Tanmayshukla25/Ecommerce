import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./Firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation, Link, useSearchParams } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("referer") || "/";
  console.log(location.state?.referer?.pathname);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setEmail("");
      setPassword("");
      setTimeout(() => navigate(from, { replace: true }), 3000);
    } catch {
      toast.error("Login Failed. Please check credentials.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="Wrapper">
      <ToastContainer />
      <div>
        <h2>Welcome Back</h2>
        <p>Login to continue shopping</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> <br />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
