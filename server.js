const { ApolloServer } = require("apollo-server");

const { sequelize } = require("./models");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
  /*
  // context: (integrationContext) => ({
  //   authScope: getScope(integrationContext.req.headers.authorization),
  // }),
    !Important: The 'integrationContext' arg varies depending on the specific integration(eg Express/Koa/Lambda etc)being used. (See table for specific signitures.):
      Express (including apollo-server)	{
        req: express.Request,
        res: express.Response
      }
    https://www.apollographql.com/docs/apollo-server/api/apollo-server/#context
    https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument

    * context: An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation. This enables resolvers to share helpful context, such as a database connection.
    
    Certain fields are added to this object automatically, depending on which Node.js middleware your server uses.
  */
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
