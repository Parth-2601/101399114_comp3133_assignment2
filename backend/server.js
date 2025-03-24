const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // ✅ Add this line
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const uploadRoute = require('./upload');

const app = express();
app.use(cors()); // ✅ Enable CORS for all origins
app.use(express.json());

// ✅ Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Upload API route
app.use('/api/upload', uploadRoute);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

server.start().then(() => {
  server.applyMiddleware({ app });

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Failed:', err));

  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 Server running at http://localhost:4000${server.graphqlPath}`);
    console.log(`📂 Uploads served at http://localhost:4000/uploads`);
    console.log(`📤 File upload API at http://localhost:4000/api/upload`);
  });
});
