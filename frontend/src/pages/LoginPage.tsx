import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN SUCCESS:", response.data);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;