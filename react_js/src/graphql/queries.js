import { gql } from "@apollo/client";

const GET_ALL_GENRES_FORM = gql`
  query {
    getAllGenre {
      _id
      title
    }
  }
`;
const GET_ALL_GAMES = gql`
  query {
    getAllGames {
      _id
      title
      platform
      poster
    }
  }
`;
const GET_GAME = gql`
  query ($id: ID) {
    getGame(id: $id) {
      title
      description
      user {
        id
        username
      }
      genre {
        _id
        title
      }
      poster
      cover
      platform
      date
    }
  }
`;
const GET_GENRE = gql`
  query ($title: String) {
    getGenre(title: $title) {
      title
      imgName
      games {
        _id
        title
        platform
        poster
      }
    }
  }
`;
const GET_USER_INFOS = gql`
  query ($id: ID) {
    getUser(id: $id) {
      username
      email
    }
  }
`;
const GET_USER_GAMES = gql`
  query ($id: ID) {
    getUser(id: $id) {
      games {
        _id
        title
        platform
        poster
      }
    }
  }
`;

export {
  GET_ALL_GENRES_FORM,
  GET_ALL_GAMES,
  GET_GAME,
  GET_GENRE,
  GET_USER_GAMES,
  GET_USER_INFOS,
};
