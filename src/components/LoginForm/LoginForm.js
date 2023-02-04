import { useState } from "react";
import * as userService from "../../utilities/users-service";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await userService.login(credentials);
      setUser(user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container sign-in-container" id="sign-in-container">
      <form autoComplete="off" onSubmit={handleSubmit} action="#">
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">LOG IN</button>
      </form>
      <h1 className="error-message">&nbsp;{error}</h1>
    </div>
  );
}
