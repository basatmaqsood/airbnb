import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/PromptWindow";

function RegisterPage() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigation, setNavigation] = useState(false);
  const [showPrompt, setShowPropmpt] = useState(false);
  const [showErrorPrompt, setShowErrorPropmpt] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        username,
        email,
        password,
      });
      console.log("User Registered!");
      setShowPropmpt(true);
    } catch (err) {
      setShowErrorPropmpt(true);
      setErrorMessage(err.response.data.errMessage);

    }
    return;
  }

  return (
    <div className="mt-4 flex flex-col gap-2 justify-around grow items-center">
      {navigation && (
        <>
          <Navigate to="/login" />
        </>
      )}

      {showPrompt ? (
        <Modal
          message="User Registerd! You'll be Redirected to Login Page now!"
          setNavigation={setNavigation}
        />
      ) : (
        <div className="mb-64 flex flex-col gap-3">
          <h1 className="text-4xl text-center">Register</h1>
          <form
            className="max-w-sm mx-auto"
            onSubmit={(ev) => {
              registerUser(ev);
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
            <button className="primary" type="submit">
              Register
            </button>
          </form>
          <div className="text-center text-gray-500">
            Already have an account?{" "}
            <Link className="underline text-primary" to="/login">
              Login Now!
            </Link>
          </div>
        </div>
      )}
      {
        showErrorPrompt && <Modal message={errorMessage} setNavigation={false} setshowErrorPrompt={false}/>
      
      }
    </div>
  );
}

export default RegisterPage;
