import { NavLink, useHistory } from "react-router-dom";
import TheButton from "../ui/TheButton";
import "../../css/components/layouts/navbar.css";
import { AuthContext } from "../../context";
import { useContext } from "react/cjs/react.development";

const NavBar = () => {
  const context = useContext(AuthContext);

  let history = useHistory();

  const handleLogout = () => {
    context.logout();
    history.push("/");
  };

  const navbar = context.user ? (
    // LOGGED IN
    <header className="navbar">
      <NavLink to="/">
        <h2>
          React <span>JS</span>
        </h2>
      </NavLink>
      <nav>
        <ul className="navlinks">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games">
              Games
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games/category/action">
              Action
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games/category/adventure">
              Adventure
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games/category/sport">
              Sport
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games/category/strategy">
              Strategy
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="actions">
        <div className="left ">
          <div className="profil">
            <NavLink to="/account" className="element">
              {context.user.username}
            </NavLink>
            <NavLink to="/account/my-games" className="element">
              My games
            </NavLink>
            <span onClick={handleLogout} className="element">
              Logout
            </span>
          </div>
        </div>
        <NavLink to="/games/add">
          <TheButton>Add Game</TheButton>
        </NavLink>
      </div>
    </header>
  ) : (
    // LOGGED OUT
    <header className="navbar">
      <NavLink to="/">
        <h2>
          React <span>JS</span>
        </h2>
      </NavLink>
      <nav>
        <ul className="navlinks">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games">
              Games
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games/category/action">
              Action
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games/category/adventure">
              Adventure
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games/category/sport">
              Sport
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/games/category/strategy">
              Strategy
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="actions">
        <div className="left">
          <NavLink to="/login" className="login">
            Login
          </NavLink>
        </div>
        <NavLink to="/register">
          <TheButton>Register</TheButton>
        </NavLink>
      </div>
    </header>
  );

  return navbar;
};

export default NavBar;
