import CoverImage from "../components/ui/CoverImage.js";
import TheTitle from "../components/ui/TheTitle.js";
import TheContainer from "../components/ui/TheContainer.js";
import TheSection from "../components/ui/TheSection.js";
import "../css/pages/the-games.css";
import { GET_USER_GAMES } from "../graphql/queries.js";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_GAME } from "../graphql/mutations.js";
import { AuthContext } from "../context.js";
import { useContext, useEffect } from "react/cjs/react.development";
import { useHistory } from "react-router-dom";

const MyGames = () => {
  const { user } = useContext(AuthContext);

  let history = useHistory();
  // CHECK IF LOGGED IN
  if (!user) {
    history.push("/");
  }

  // QUERY
  const { loading, data, refetch } = useQuery(GET_USER_GAMES, {
    variables: { id: user.id },
  });

  console.log(data);

  // DELETE GAME MUTATION
  const [deleteGame] = useMutation(DELETE_GAME);

  useEffect(() => {
    refetch();
  }, []);
  // DELETE GAME FUNCTION
  const deleteGameButton = (id) => {
    deleteGame({
      variables: {
        id,
      },
      update() {
        refetch();
      },
    });
  };

  return (
    <div>
      <CoverImage
        title={`${user.username}'s games`}
        img="https://wallpaperaccess.com/full/7445.jpg"
      />

      <TheContainer>
        <div className="the-games">
          <TheTitle>
            {data ? `There are ${data.getUser.games.length} games` : ""}
          </TheTitle>
          {loading ? (
            "loading ..."
          ) : (
            <div className="products">
              {data.getUser.games.map((game) => (
                <TheSection
                  key={game._id}
                  data={game}
                  deleteGame={deleteGameButton}
                />
              ))}
            </div>
          )}
        </div>
      </TheContainer>
    </div>
  );
};

export default MyGames;
