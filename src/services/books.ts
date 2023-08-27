// Import necessary modules and database model (pg)
const booksService = {
  // Service method to retrieve a list of all books
  async getAllBooks() {
    try {
      return await pg.books.findAll(); // Fetch all books from the database
    } catch (error) {
      throw error; // Handle and propagate any errors
    }
  },

  // Service method to retrieve a specific book by ID
  async getBookById(id: string) {
    try {
      return await pg.books.findOne({ where: { id } }); // Fetch a book by its ID from the database
    } catch (error) {
      throw error; // Handle and propagate any errors
    }
  },

  // Service method to add a new book
  async addBook(title: string, author: string, publishedYear: number) {
    try {
      return await pg.books.create({ title, author, published_year: publishedYear }); // Create and add a new book to the database
    } catch (error) {
      throw error; // Handle and propagate any errors
    }
  },

  // Service method to update an existing book by ID
  async updateBook(id: string, title: string, author: string, publishedYear: number) {
    try {
      const book = await pg.books.findOne({ where: { id } }); // Find a book by its ID

      if (!book) {
        throw new Error('Book not found'); // Throw an error if the book is not found
      }

      // Update the book's properties
      book.title = title;
      book.author = author;
      book.published_year = publishedYear;

      await book.save(); // Save the updated book in the database

      return book; // Return the updated book
    } catch (error) {
      throw error; // Handle and propagate any errors
    }
  },

  // Service method to delete a book by ID
  async deleteBook(id: string) {
    try {
      const book = await pg.books.findOne({ where: { id } }); // Find a book by its ID

      if (!book) {
        throw new Error('Book not found'); // Throw an error if the book is not found
      }

      await book.destroy(); // Delete the book from the database
      return "Book deleted successfully"; // Return a success message
    } catch (error) {
      throw error; // Handle and propagate any errors
    }
  },
};

export default booksService; // Export the booksService for use in controllers
