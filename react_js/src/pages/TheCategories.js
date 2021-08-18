import CoverImage from "../components/ui/CoverImage.js";
import TheTitle from "../components/ui/TheTitle.js";
import TheContainer from "../components/ui/TheContainer.js";
import TheSection from "../components/ui/TheSection.js";
import "../css/pages/the-games.css";
import { useParams } from "react-router-dom";
import { GET_GENRE } from "../graphql/queries.js";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_GAME } from "../graphql/mutations.js";

const TheCategories = () => {
  let { type } = useParams();

  const { data, refetch } = useQuery(GET_GENRE, {
    variables: { title: type },
  });

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
        title={data ? data.getGenre.title : ""}
        img={
          data
            ? "http://127.0.0.1:4000/images/type/" + data.getGenre.imgName
            : ""
        }
      />

      <TheContainer>
        <div className="the-games">
          <TheTitle>
            {data ? `There are ${data.getGenre.games.length} Games` : ""}
          </TheTitle>

          <div className="products">
            {data &&
              data.getGenre.games.map((game) => (
                <TheSection
                  key={game._id}
                  data={game}
                  deleteGame={deleteGameButton}
                />
              ))}
          </div>
        </div>
      </TheContainer>
    </div>
  );
};

export default TheCategories;
