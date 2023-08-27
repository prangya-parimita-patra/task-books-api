import request from 'supertest';
import app from './src/index'; // Replace with the correct path to your app's entry point

// Function to check if the database is ready
async function isDatabaseReady() {
  // Replace this with your actual database connection logic
  // You might want to use a Sequelize or other database library here
  // For demonstration purposes, we'll just simulate a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // Simulate that the database is ready
    }, 2000); // Simulate a 2-second delay
  });
}

var testBookId: number; // Variable to store the ID of the book created during testing

// Start the tests
describe('Book API Tests', () => {
  let server: request.SuperTest<request.Test>;

  beforeAll(async () => {
    // Wait for the database to become available
    const isReady = await isDatabaseReady();

    if (!isReady) {
      throw new Error('Database is not ready');
    }

    // Create the HTTP server once the database is ready
    server = request(app);
  });

  it('should retrieve all books', async () => {
    const response = await server.get('/api/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should add a new book', async () => {
    const newBook = {
      title: 'New Book',
      author: 'Author Name',
      publishedYear: 2023,
    };

    const response = await server.post('/api/books').send(newBook);
    testBookId = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', newBook.title);
  });

  it('should retrieve a specific book by ID', async () => {
    const response = await server.get(`/api/books/${testBookId}`); // Replace with a valid book ID
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
  });

  it('should update an existing book', async () => {
    const updatedBook = {
      title: 'Updated Book',
      author: 'Updated Author',
      publishedYear: 2024,
    };

    const response = await server
      .put(`/api/books/${testBookId}`) // Replace with a valid book ID
      .send(updatedBook);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', updatedBook.title);
  });

  it('should delete a book', async () => {
    const response = await server
      .delete(`/api/books/${testBookId}`) // Replace with a valid book ID
      .send();

    expect(response.status).toBe(200);
  });
});
