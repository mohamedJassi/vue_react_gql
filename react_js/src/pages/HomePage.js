import { Link } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import TheButton from "../components/ui/TheButton";
import { AuthContext } from "../context";
import "../css/pages/home.css";
const HomePage = () => {
  const context = useContext(AuthContext);

  return (
    <div className="banner">
      <div className="content">
        <h1>Lorem, ipsum.</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
          commodi, enim repudiandae laudantium facere tempora voluptates
          necessitatibus maxime! Autem distinctio reiciendis fugiat cumque esse
          tenetur vitae tempore, nostrum ipsam nobis molestias qui sunt facilis
          reprehenderit animi quidem ipsum.
        </p>
        <br />
        <div className="actions">
          {context.user ? (
            <Link to="/games/add">
              <TheButton>Add Game</TheButton>
            </Link>
          ) : (
            <Link to="/register">
              <TheButton> Register </TheButton>
            </Link>
          )}

          <Link to="/games">
            <TheButton>See Games</TheButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
