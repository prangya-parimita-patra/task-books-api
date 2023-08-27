// Import Sequelize and define the Book model
module.exports = (sequelize: any, Sequelize: any) => {
  // Define the "Book" model using sequelize.define
  const Book = sequelize.define(
    "books", // Name of the database table
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      published_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Include timestamps (createdAt and updatedAt) in the table
      freezeTableName: true, // Use the same model name as the table name
      underscored: true, // Use underscored naming for columns (e.g., published_year)
    }
  );

  // Return the "Book" model
  return Book;
};
