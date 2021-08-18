import CoverImage from "../components/ui/CoverImage.js";
import TheTitle from "../components/ui/TheTitle.js";
import TheContainer from "../components/ui/TheContainer.js";
import TheSection from "../components/ui/TheSection.js";
import "../css/pages/the-games.css";
import { GET_ALL_GAMES } from "../graphql/queries.js";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_GAME } from "../graphql/mutations.js";

const TheGames = () => {
  const { loading, data, refetch } = useQuery(GET_ALL_GAMES);
  const [deleteGame] = useMutation(DELETE_GAME);

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
        title="All games"
        img="https://wallpaperaccess.com/full/7445.jpg"
      />

      <TheContainer>
        <div className="the-games">
          <TheTitle>
            {data ? `There are ${data.getAllGames.length} games` : ""}
          </TheTitle>
          {loading ? (
            "loading ..."
          ) : (
            <div className="products">
              {data.getAllGames.map((game) => (
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

export default TheGames;
