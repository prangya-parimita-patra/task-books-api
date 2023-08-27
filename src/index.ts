// Import necessary modules and configurations
import * as express from 'express'; // Import Express to create the application
import * as bodyParser from 'body-parser'; // Import bodyParser for parsing JSON request bodies
import dbCon from './config/database'; // Import the database connection function
import booksRouter from './api/books'; // Import the booksRouter for handling book-related routes

// Create an instance of the Express application
const app = express.default();
const port = process.env.PORT || 3000; // Define the port for the server to listen on (default: 3000)

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use the booksRouter for routes under '/api/books' path
app.use('/api/books', booksRouter);

// Define a default route for the server
app.get('/', (req, res) => {
  res.send('Task Books Server Running!');
});

// Initialize the database connection
dbCon();

// Delay for 10 seconds before starting the server (used for database connection in previous code)
setTimeout(() => {new Promise((resolve) => resolve(true));}, 10000);

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log a message when the server starts
});

export default app; // Export the Express application for use in other parts of the application
