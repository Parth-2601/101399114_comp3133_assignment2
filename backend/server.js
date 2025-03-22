const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();
app.use(express.json()); // Ensure JSON body parsing

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })  // ✅ Pass the req object
});

server.start().then(() => {
  server.applyMiddleware({ app });

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Failed:', err));

  app.listen(process.env.PORT || 4000, () => 
    console.log(`🚀 Server running at http://localhost:4000${server.graphqlPath}`)
  );
});
