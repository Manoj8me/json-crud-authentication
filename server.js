const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your db.json file
const middlewares = jsonServer.defaults();

// Enable CORS
const cors = require('cors');
server.use(cors()); // Allow requests from all origins

// Use default middlewares (like logger, static, etc.)
server.use(middlewares);

// Serve the API
server.use(router);

// Listen on the provided PORT (Render will assign the PORT automatically)
const PORT = process.env.PORT || 3000; // Default to 3000 if no PORT is provided
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
