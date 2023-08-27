// Import required modules and controllers
import * as express from 'express'; // Import express module
import { Router } from 'express'; // Import Router from express
import booksController from '../controllers/books'; // Import the booksController
import { body, param } from 'express-validator'; // Import validators for input validation

// Create an instance of the Router
const router: Router = express.Router();

// Define routes and associated controllers

// Route to get a list of all books
router.get('/', booksController.getAllBooks);

// Route to get a specific book by ID
router.get('/:id', [
  // Validation middleware for 'id' parameter
  param('id').isUUID(4).withMessage('Invalid book ID format'),
], booksController.getBookById);

// Route to add a new book
router.post('/', [
  // Validation middleware for request body fields
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishedYear').isInt().withMessage('Published year must be a valid number'),
], booksController.addBook);

// Route to update an existing book by ID
router.put('/:id', [
  // Validation middleware for 'id' parameter
  param('id').isUUID(4).withMessage('Invalid book ID format'),
  // Validation middleware for request body fields
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishedYear').isInt().withMessage('Published year must be a valid number'),
], booksController.updateBook);

// Route to delete a book by ID
router.delete('/:id', [
  // Validation middleware for 'id' parameter
  param('id').isUUID(4).withMessage('Invalid book ID format'),
], booksController.deleteBook);

// Export the router to make it available to other parts of the application
export default router;
