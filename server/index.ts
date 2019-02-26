import * as express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { TypeDefs } from './schema';
import { resolvers } from './resolvers';
export const pubsub = new PubSub();

const PORT = 4000;

const app = express();

process.on('uncaughtException', err => console.error(err));
process.on('unhandledRejection', err => console.error(err));
// CORSを許可する
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// resolvers
const server = new ApolloServer({ typeDefs: TypeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });

try {
  // ws_server
  const httpServer = createServer(app);

  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: PORT }, err => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Websocket Server is now running on ws://localhost:${PORT}${
        server.subscriptionsPath
      }`
    );
    if (err) {
      throw new Error(err);
    }
  });
} catch (error) {
  console.error(error);
}
