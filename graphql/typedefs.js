const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload
  ########## TYPES ##########
  type Game {
    _id: ID
    title: String
    description: String
    genre: Genre
    user: User
    platform: String
    date: String
    poster: String
    cover: String
  }

  type Genre {
    _id: ID
    title: String
    imgName: String
    games: [Game]
  }

  type User {
    id: ID
    username: String
    email: String
    token: String
    games: [Game]
  }

  ########## QUERIES ##########
  type Query {
    hello: String

    # GAME QUERIES
    getGame(id: ID): Game
    getAllGames: [Game]

    # GENRE QUERIES
    getAllGenre: [Genre]
    getGenre(title: String): Genre

    #USER QUERIES
    getUser(id: ID): User
  }

  ########## INPUTS ##########

  # Game Input
  input GameInput {
    title: String
    description: String
    genreId: ID
    poster: Upload
    cover: Upload
    platform: String
    date: String
  }

  # Genre Input
  input GenreInput {
    title: String
    img: Upload
  }

  # User Input
  input RegisterInput {
    username: String
    email: String
    password: String
  }

  ########## MUTATIONS ##########
  type Mutation {
    # Game Mutations
    createGame(game: GameInput): Game
    updateGame(id: ID, game: GameInput): Game
    deleteGame(id: ID): String

    # Genre Mutations
    createGenre(genre: GenreInput): Genre

    # User Mutations
    register(user: RegisterInput): User
    login(username: String, password: String): User
    updateUser(user: RegisterInput): User
  }
`;
module.exports = typeDefs;
