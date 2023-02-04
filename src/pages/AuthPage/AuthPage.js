import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState } from "react";
import "./AuthPage.css";

export default function AuthPage(props) {
  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };

  return (
    <main>
      <div
        className={`container auth ${isActive ? "right-panel-active" : ""}`}
        id="container"
      >
        <SignUpForm setUser={props.setUser} />
        <LoginForm setUser={props.setUser} />

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={ToggleClass}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={ToggleClass}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
