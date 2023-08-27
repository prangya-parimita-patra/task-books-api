// Import necessary modules and services
import { Request, Response } from 'express'; // Import Express types for request and response objects
import booksService from '../services/books'; // Import the booksService for handling business logic

// Define the booksController object with methods for handling routes
const booksController = {
  // Controller method to retrieve a list of all books
  async getAllBooks(req: Request, res: Response) {
    try {
      const books = await booksService.getAllBooks(); // Call the service to fetch all books
      res.json(books); // Respond with the fetched books in JSON format
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' }); // Handle errors and respond with a 500 status code
    }
  },

  // Controller method to retrieve a specific book by ID
  async getBookById(req: Request, res: Response) {
    const { id } = req.params; // Extract the book ID from request parameters

    try {
      const book = await booksService.getBookById(id); // Call the service to fetch the book by ID

      if (!book) {
        return res.send("Book not found"); // Respond with a message if the book is not found
      }

      res.json(book); // Respond with the fetched book in JSON format
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' }); // Handle errors and respond with a 500 status code
    }
  },

  // Controller method to add a new book
  async addBook(req: Request, res: Response) {
    const { title, author, publishedYear } = req.body; // Extract book details from the request body

    try {
      const book = await booksService.addBook(title, author, publishedYear); // Call the service to add a new book
      res.status(201).json(book); // Respond with the added book and a 201 status code (Created)
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error'); // Handle errors and respond with an error message
    }
  },

  // Controller method to update an existing book by ID
  async updateBook(req: Request, res: Response) {
    const { id } = req.params; // Extract the book ID from request parameters
    const { title, author, publishedYear } = req.body; // Extract updated book details from the request body

    try {
      const book = await booksService.updateBook(id, title, author, publishedYear); // Call the service to update the book
      res.json(book); // Respond with the updated book in JSON format
    } catch (error) {
      console.error(error);
      if (error === 'Book not found') {
        return res.send('Book not found'); // Respond with a message if the book is not found
      }
      res.send('Internal Server Error'); // Handle other errors and respond with an error message
    }
  },

  // Controller method to delete a book by ID
  async deleteBook(req: Request, res: Response) {
    const { id } = req.params; // Extract the book ID from request parameters

    try {
      let resp = await booksService.deleteBook(id); // Call the service to delete the book
      res.send({ message: resp }); // Respond with a success message
    } catch (error) {
      console.error(error);
      if (error === 'Book not found') {
        return res.send('Book not found'); // Respond with a message if the book is not found
      }
      res.status(500).json({ error: 'Internal Server Error' }); // Handle errors and respond with a 500 status code
    }
  },
};

export default booksController; // Export the booksController object for use in routes
