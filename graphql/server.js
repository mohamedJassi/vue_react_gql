const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const path = require("path");
const resolvers = require("./resolvers");
const typeDefs = require("./typedefs");

// DATABASE CONNEXTION
const url =
  "mongodb+srv://admin:admin@node-tuto.nzjxy.mongodb.net/gql-games?retryWrites=true&w=majority";
mongoose.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  () => console.log("connected to db")
);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });
  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  app.use("/images", express.static(path.join(__dirname, "images")));
  await new Promise((r) => app.listen({ port: 4000 }, r));

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
