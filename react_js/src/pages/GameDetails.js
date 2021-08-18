import { useMutation, useQuery } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import CoverImage from "../components/ui/CoverImage";
import TheButton from "../components/ui/TheButton";
import TheContainer from "../components/ui/TheContainer";
import { AuthContext } from "../context";
import "../css/pages/game-details.css";

import { DELETE_GAME } from "../graphql/mutations";
import { GET_GAME } from "../graphql/queries";

const GameDetails = () => {
  const { user } = useContext(AuthContext);

  // GETTING PARAMS
  let { id } = useParams();
  let history = useHistory();

  // GET GAME DETAILS QUERY
  const { data, loading } = useQuery(GET_GAME, {
    variables: { id },
  });

  // DELETE GAME MUTATION
  const [deleteGame] = useMutation(DELETE_GAME);

  // DELETE BUTTON METHOD
  const deleteButton = (id) => {
    deleteGame({
      variables: { id },
      onCompleted: () => history.push("/games"),
    });
  };
  return (
    <div className="game-details">
      {loading ? (
        "LOADING ..."
      ) : (
        <>
          <CoverImage
            title={data.getGame.title}
            img={
              "http://127.0.0.1:4000/images/games/covers/" + data.getGame.cover
            }
          />

          <TheContainer>
            <div className="game-info">
              <div
                className="poster"
                style={{
                  backgroundImage: `url(http://127.0.0.1:4000/images/games/posters/${data.getGame.poster})`,
                }}
              >
                <div className="wrap"></div>
              </div>
              <div className="info">
                <div className="bloc">
                  <h3 className="title">Name :</h3>
                  <h2>{data.getGame.title}</h2>
                </div>

                <div className="bloc">
                  <h3 className="title">Released on :</h3>
                  <h2>{data.getGame.date}</h2>
                </div>
                <div className="bloc">
                  <h3 className="title">Author :</h3>
                  <h2>{data.getGame.user.username}</h2>
                </div>
                <div className="bloc">
                  <h3 className="title">Plateform :</h3>
                  <h2>{data.getGame.platform}</h2>
                </div>

                <div className="bloc">
                  <h3 className="title">Category :</h3>
                  <h2>{data.getGame.genre.title}</h2>
                </div>

                <div className="desc">
                  <h3 className="title">Description :</h3>
                  <p>{data.getGame.description}</p>
                </div>
                {user && user.id === data.getGame.user.id && (
                  <div className="buttons">
                    <Link to={"/games/edit/" + id}>
                      <TheButton>Update </TheButton>
                    </Link>

                    <TheButton click={() => deleteButton(id)}>Delete</TheButton>
                  </div>
                )}
              </div>
            </div>
          </TheContainer>
        </>
      )}
    </div>
  );
};

export default GameDetails;
