import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css"; 
import { storage } from "./Firebase";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  async function handel(e) {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("Passwords do not match!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });

      toast.success("Registered Successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPass("");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch {
      toast.error("Registration Failed", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className={styles.regContainer}>
      <ToastContainer />
      <div className={styles.regCard}>
        <div className={styles.regTab}>
          <span className={styles.tabInactive}>Sign In</span>
          <span className={styles.tabActive}>Register</span>
        </div>

        <h2 className={styles.regTitle}>Create Your Account</h2>

        <form className={styles.regForm} onSubmit={handel}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
            required
          />

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of Service</a>
            </label>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign Up
          </button>
        </form>
        <p className={styles.loginFooter}>
          Do you have an account?{" "}
          <span className={styles.loginLink}>
            <Link to={"/login"}>Log In</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
