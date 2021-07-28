const { ApolloServer } = require("apollo-server");

const { sequelize } = require("./models");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const contextMiddleware = require("./util/contextMiddleware");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

server.listen().then(({ url }) => {
  console.log(`
    *----------------------------------*
    |----------------------------------|
    |-------- Server running: ---------|
    |---- ${url} ------|
    |----------------------------------|
    |----------------------------------|
    `);

  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected!");
    })
    .catch((err) => {
      console.log(err);
    });
});
