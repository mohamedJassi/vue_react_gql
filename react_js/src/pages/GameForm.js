import { useMutation, useQuery } from "@apollo/client";

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import TheButton from "../components/ui/TheButton";
import TheContainer from "../components/ui/TheContainer";
import TheTitle from "../components/ui/TheTitle";
import { AuthContext } from "../context";
import "../css/pages/GameForm.css";
import { CREATE_GAME, UPDATE_GAME } from "../graphql/mutations";
import { GET_ALL_GENRES_FORM, GET_GAME } from "../graphql/queries";

const GameForm = () => {
  const [title, setTitle] = useState("");
  // const [created_at, setCreated_at] = useState("2021-10-10");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState();
  const [date, setDate] = useState("2021-01-01");
  const [platform, setPlatform] = useState("playstation");
  const [genreId, setGenreId] = useState();
  const [poster, setPoster] = useState();
  const [cover, setCover] = useState();

  const context = useContext(AuthContext);

  let { id } = useParams();
  let history = useHistory();

  // CHECK IF USER LOGGED IN
  if (!context.user) {
    history.push("/");
  }

  const [createGame] = useMutation(CREATE_GAME, {
    onCompleted: (data) => history.push("/games/view/" + data.createGame._id),
  });
  const [updateGame] = useMutation(UPDATE_GAME, {
    onCompleted: (data) => history.push("/games/view/" + data.updateGame._id),
  });

  useQuery(GET_ALL_GENRES_FORM, {
    onCompleted: (data) => {
      setGenres(data.getAllGenre);
      setGenreId(data.getAllGenre[0]._id);
    },
  });

  useEffect(() => {}, []);

  useQuery(GET_GAME, {
    variables: { id },
    skip: !id,
    onCompleted: (data) => {
      setTitle(data.getGame.title);
      setDescription(data.getGame.description);
      setGenreId(data.getGame.genre._id);
      setPlatform(data.getGame.platform);
      setDate(data.getGame.date);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      genreId,
      poster,
      date,
      platform,
      cover,
    };
    id
      ? updateGame({ variables: { ...{ id }, ...data } })
      : createGame({ variables: data });
  };

  return (
    <TheContainer>
      <div className="game-form">
        <div className="img">
          <div className="wrap"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <TheTitle>EDIT GAME</TheTitle>
          <div className="title bloc w-40">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* <!-- DATE --> */}
          <div className="date bloc w-40">
            <label htmlFor="date">Release date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* <!-- PLATFORM --> */}
          <div className="type bloc select w-40">
            <label htmlFor="type">Platform</label>
            <select
              name="type"
              id="type"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="windows">Windows</option>
              <option value="playstation">Playstation</option>
              <option value="xbox">Xbox</option>
            </select>
          </div>

          {/* <!-- GENRE --> */}
          <div className="type bloc select w-40">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
            >
              {genres &&
                genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.title}
                  </option>
                ))}
            </select>
          </div>
          {/* <!-- DESCRIPTION --> */}
          <div className="description bloc textarea w-100">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* <!-- POSTER --> */}
          <div className="bloc w-40">
            <label htmlFor="poster">Poster</label>
            <input
              type="file"
              name="poster"
              id="poster"
              onChange={(e) => setPoster(e.target.files[0])}
            />
          </div>
          {/* <!-- COVER-IMG --> */}
          <div className=" bloc w-40">
            <label htmlFor="cover-img">Cover Image</label>
            <input
              type="file"
              name="cover-img"
              id="cover-img"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
          <TheButton>{id ? "Update" : "Create"} </TheButton>
        </form>
      </div>
    </TheContainer>
  );
};

export default GameForm;
