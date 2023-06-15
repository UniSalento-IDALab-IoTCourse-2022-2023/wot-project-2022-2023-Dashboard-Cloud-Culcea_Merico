const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Import routes
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

// Middleware
app.use(express.json());

const staticPath = path.join(__dirname, "./public")
app.use("/public", express.static(staticPath))

// Routes
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Start the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
