const { GraphQLUpload } = require("graphql-upload");
const { UserInputError, ApolloError } = require("apollo-server-express");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("./checkAuth");
const Genre = require("./models/genre");
const Game = require("./models/game");
const User = require("./models/user");

const getFile = async (file, directory, name) => {
  // GET DATA FROM FILE
  const { createReadStream, filename, mimetype, encoding } = await file;
  // READING FILE
  const stream = createReadStream();
  // SLUGIFY TEXT
  name = name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  // CREATING ANEW NAME FOR THE FILE
  const newFilename = `${name}-${new Date().getTime()}.${filename
    .split(".")
    .pop()}`;
  // CREATING NEW PATH
  const pathName = path.join(__dirname, `${directory}${newFilename}`);
  // PUTTING THE NEW CREATED FILE IN
  await stream.pipe(fs.createWriteStream(pathName));
  return newFilename;
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    "games key",
    { expiresIn: "1h" }
  );
};

const resolvers = {
  Upload: GraphQLUpload,
  Game: {
    genre: async (parent, args) => {
      return Genre.findById(parent.genreId);
    },
    user: async (parent, args) => {
      return User.findById(parent.userId);
    },
  },

  Genre: {
    games: async (parent, args) => {
      return Game.find({ genreId: parent._id });
    },
  },

  User: {
    games: async (parent, args) => {
      return Game.find({ userId: parent.id });
    },
  },

  Query: {
    hello: async () => {
      return "Hello world";
    },
    getAllGames: async (parent, args, context) => {
      return Game.find().sort({ createdAt: -1 });
    },
    getGame: async (parent, args) => {
      return Game.findById(args.id);
    },

    getAllGenre: async (parent, args) => {
      return Genre.find();
    },

    getGenre: async (parent, args) => {
      const genre = await Genre.find({ title: args.title });
      return genre[0];
    },

    getUser: async (parent, { id }) => {
      return User.findById(id);
    },
  },

  Mutation: {
    createGame: async (parent, args, context) => {
      // CHECK AUTH
      const user = checkAuth(context);
      console.log("register : ", user);

      // GET ARGS
      const { title, description, genreId, poster, cover, platform, date } =
        args.game;

      // GETTING FILES
      const posterImg = await getFile(poster, "./images/games/posters/", title);
      const coverImg = await getFile(cover, "./images/games/covers/", title);

      // CONSOLING DATA
      // console.log(args.game);

      // ADDING GAME TO DB
      const game = await new Game({
        title,
        description,
        genreId,
        platform,
        date,
        userId: user.id,
        poster: posterImg,
        cover: coverImg,
      });

      // RETURNING DATA
      return game.save();
    },
    updateGame: async (parent, args) => {
      const { title, description, genreId, poster, cover, platform, date } =
        args.game;

      const data = await Game.findById(args.id);

      let posterImg;
      let coverImg;
      // CHECKING IF IMGS INSRTED
      if (poster) {
        posterImg = await getFile(poster, "./images/games/posters/", title);
      } else {
        posterImg = data.poster;
      }

      if (cover) {
        coverImg = await getFile(cover, "./images/games/covers/", title);
      } else {
        coverImg = data.cover;
      }

      const game = await Game.findByIdAndUpdate(
        args.id,
        {
          title,
          description,
          genreId,
          platform,
          date,
          poster: posterImg,
          cover: coverImg,
        },
        { new: true }
      );
      return game;
    },
    deleteGame: async (parent, args) => {
      await Game.findByIdAndDelete(args.id);
      return "game deleted";
    },
    createGenre: async (parent, args) => {
      const title = args.genre.title;
      const imgName = await getFile(args.genre.img, "./images/type/", title);
      console.log("genre created");
      const genre = await new Genre({ title, imgName });
      return genre.save();
    },
    register: async (parent, args) => {
      // GETTING DATA
      const { username, email, password } = args.user;
      console.log(username, email, password);
      // HASH PASSWORD
      newPassword = await bcrypt.hash(password, 12);

      // CHECKING IF USER EXISTS
      const checkUser = await User.findOne({ username });
      if (checkUser) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "this username is taken",
          },
        });
      }

      // CREATING NEW USER
      const user = await new User({ username, email, password: newPassword });

      // GETTING THE NEW USER INFOS
      const data = await user.save();

      console.log(data);
      // CREATING TOKEN
      const token = generateToken(data);

      // RETURNING DATA
      return {
        ...data._doc,
        id: data._id,
        token,
      };
    },
    login: async (parent, args) => {
      const { username, password } = args;
      // CHECK IF USER EXIST
      const user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError("Login error", {
          errors: {
            general: "User dosen't exist",
          },
        });
      }

      // CHECK PASSWORD
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("Login error", {
          errors: {
            general: "Wrong password",
          },
        });
      }

      // CREATING TOKEN
      const token = generateToken(user);

      // RETURNING DATA
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    updateUser: async (parent, args, context) => {
      // GETTING ARGS
      const { username, email, password } = args.user;
      // CHECK AUTH
      const user = checkAuth(context);
      console.log(username, email, password);

      // GETT
      const oldUser = await User.findById(user.id);
      // ERRORS
      if (!oldUser) {
        throw new ApolloError("Login error", {
          errors: {
            general: "Something went wrong",
          },
        });
      }

      // CHECK IF USERNAME IS TAKEN
      if (oldUser.username !== username) {
        const checkUsername = await User.findOne({ username });

        if (checkUsername) {
          throw new UserInputError("Username is taken", {
            errors: {
              username: "this username is taken",
            },
          });
        }
      }

      // CHECK IF PASSWORD CHANGED
      if (password) {
        // HASH PASSWORD
        newPassword = await bcrypt.hash(password, 12);
      } else {
        newPassword = oldUser.password;
      }

      // UPDATE
      const newUser = await User.findByIdAndUpdate(
        user.id,
        {
          username,
          email,
          password: newPassword,
        },
        { new: true }
      );

      // CREATING TOKEN
      const token = generateToken(newUser);

      return {
        ...newUser._doc,
        id: newUser.id,
        token,
      };
    },
  },
};

module.exports = resolvers;
