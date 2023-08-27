# Task Books API

Task Books API is a RESTful web service for managing book records. It provides a set of endpoints for creating, retrieving, updating, and deleting book entries. This README provides an overview of the project and instructions on how to use it.

# Local URL - http://localhost:3000
# Prod URL - https://task-books-e6vp3iquhq-uc.a.run.app

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Postman Collection](#postman-collection)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

### Installation

Follow these steps to set up the project:

1. Clone this repository to your local machine:

   git clone https://github.com/prangya-parimita-patra/task-books-api.git

2. Install all modules needed to run the project:

   npm i

3. Run on local environment

   npm run dev

4. Host on production - Put path of Dockerfile in project , select the environment for NodeJS and default start script - npm start

5. Run tests - npm test

6. Make test coverage report - npm run coverage , folder is created in root folder named coverage

# Local URL - http://localhost:3000
# Prod URL - https://task-books-e6vp3iquhq-uc.a.run.app


Collection of all the 5 APIs along woth test scripts of postman
1. GET /api/books: Retrieve a list of all books.
2. GET /api/books/:id: Retrieve a specific book by its ID.
3. POST /api/books: Add a new book to the collection.
4. PUT /api/books/:id: Update an existing book by its ID.
5. DELETE /api/books/:id: Delete a book from the collection by its ID.


### Postman Collection
1. A Postman collection and environment file are included in the postman folder of this project. You can use these files to test the API endpoints using Postman.

2. Import the Postman collection: Open Postman and import the task-books.postman_collection.json file located in the postman folder.

3. Import the Postman environment: Import the task-books.postman_environment.json file also located in the postman folder. This environment file contains variables used in the collection.

4. Set environment variables: Make sure to set the necessary environment variables like task-book-url to point to your API server (e.g., http://localhost:3000) within Postman for local and .

5. un API tests: You can now run API tests from the imported collection to interact with and test the API endpoints.