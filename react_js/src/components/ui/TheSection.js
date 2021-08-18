import { Link } from "react-router-dom";
import TheButton from "./TheButton";
import "../../css/components/ui/the-section.css";

const TheSection = ({ data, deleteGame }) => {
  return (
    <section
      className="the-section"
      style={{
        backgroundImage:
          "url(http://127.0.0.1:4000/images/games/posters/" + data.poster + ")",
      }}
    >
      <div className="wrap">
        <div className="action">
          <Link to={"/games/view/" + data._id}>
            <TheButton>Details</TheButton>
          </Link>

          <Link to={"/games/edit/" + data._id}>
            <TheButton>Edit</TheButton>
          </Link>
          <TheButton click={() => deleteGame(data._id)}>Delete</TheButton>
        </div>
        <div className="info">
          <h2>{data.title}</h2>
          <h3>{data.platform}</h3>
        </div>
      </div>
    </section>
  );
};

export default TheSection;
