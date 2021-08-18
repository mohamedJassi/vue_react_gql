import { gql } from "@apollo/client";

const CREATE_GAME = gql`
  mutation createGame(
    $title: String
    $description: String
    $genreId: ID
    $poster: Upload
    $platform: String
    $date: String
    $cover: Upload
  ) {
    createGame(
      game: {
        title: $title
        cover: $cover
        platform: $platform
        poster: $poster
        genreId: $genreId
        date: $date
        description: $description
      }
    ) {
      _id
    }
  }
`;

const UPDATE_GAME = gql`
  mutation updateGame(
    $id: ID
    $title: String
    $description: String
    $genreId: ID
    $poster: Upload
    $platform: String
    $date: String
    $cover: Upload
  ) {
    updateGame(
      id: $id
      game: {
        title: $title
        cover: $cover
        platform: $platform
        poster: $poster
        genreId: $genreId
        date: $date
        description: $description
      }
    ) {
      _id
    }
  }
`;

const DELETE_GAME = gql`
  mutation deleteGame($id: ID) {
    deleteGame(id: $id)
  }
`;

const CREATE_GENRE = gql`
  mutation createGenre($title: String, $img: Upload) {
    createGenre(genre: { title: $title, img: $img }) {
      imgName
      title
    }
  }
`;

const REGISTER = gql`
  mutation register($username: String, $password: String, $email: String) {
    register(
      user: { username: $username, password: $password, email: $email }
    ) {
      id
      email
      username
      token
    }
  }
`;

const LOGIN = gql`
  mutation ($username: String, $password: String) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($email: String, $username: String, $password: String) {
    updateUser(
      user: { email: $email, username: $username, password: $password }
    ) {
      id
      username
      email
      token
    }
  }
`;

export {
  CREATE_GAME,
  UPDATE_GAME,
  DELETE_GAME,
  CREATE_GENRE,
  REGISTER,
  LOGIN,
  UPDATE_USER,
};
