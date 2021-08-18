import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react/cjs/react.development";
import TheButton from "../components/ui/TheButton";
import TheTitle from "../components/ui/TheTitle";
import { AuthContext } from "../context";
import "../css/pages/inscription.css";
import { REGISTER } from "../graphql/mutations";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const context = useContext(AuthContext);

  let history = useHistory();

  // CHECK IF USER LOGGED IN
  if (context.user) {
    history.push("/");
  }

  const [addUser] = useMutation(REGISTER, {
    variables: {
      username: username.trim(),
      email: email.trim(),
      password,
    },
    onError(err) {
      alert(err.graphQLErrors[0].extensions.errors.username);
    },
    update(_, result) {
      console.log(result.data.register);
      context.login(result.data.register);
      history.push("/games");
    },
  });

  const handleSubmit = (e) => {
    setUsername(username.trim());
    setEmail(email.trim());
    e.preventDefault();
    if (password === confPassword) {
      if (username && email && password) {
        console.log(username, email, password);
        addUser();
      } else {
        alert("all fields are required");
      }
    } else {
      alert("Confirm your password");
    }
  };

  return (
    <div
      className="inscription"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/originals/fc/79/ec/fc79ec4472396ed44989b0ed8e811178.jpg)",
      }}
    >
      <div className="content">
        <TheTitle>Register</TheTitle>
        <form onSubmit={handleSubmit}>
          <div className="bloc">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="bloc">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="bloc">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="bloc">
            <label htmlFor="confPassword">Confirm password</label>
            <input
              type="password"
              id="confPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>

          <TheButton>Register </TheButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
