import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react/cjs/react.development";
import TheButton from "../components/ui/TheButton";
import TheTitle from "../components/ui/TheTitle";
import { AuthContext } from "../context";
import "../css/pages/inscription.css";
import { LOGIN } from "../graphql/mutations";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);

  let history = useHistory();

  // CHECK IF USER LOGGED IN
  if (context.user) {
    history.push("/");
  }

  const [login] = useMutation(LOGIN, {
    variables: {
      username: username.trim(),
      password: password.trim(),
    },
    onError(err) {
      console(err.graphQLErrors[0].extensions.errors.general);
    },
    update(_, result) {
      console.log(result.data.login);
      context.login(result.data.login);
      history.push("/games");
    },
  });

  const handleSubmit = (e) => {
    setUsername(username.trim());
    e.preventDefault();
    if (username && password) {
      console.log(username, password);
      login();
    } else {
      alert("all fields are required");
    }
  };

  return (
    <div
      className="inscription"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/originals/4f/09/2e/4f092e13866ce8eaa3344242633a260d.jpg)",
      }}
    >
      <div className="content">
        <TheTitle>Login</TheTitle>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <TheButton>Login</TheButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
