// Import necessary modules
import { Sequelize } from 'sequelize'; // Import Sequelize for database connection
import * as dotenv from 'dotenv'; // Import dotenv for loading environment variables
import { pgModels } from "../models/modelMap"; // Import database models (you may need to adjust the import path)

// Define variables for database connection
var sequelize: any, pg: any;

// Load environment variables from .env file
dotenv.config();

// Declare a global variable for the database connection
declare global {
  var pg: any;
}

// Function to establish a database connection
async function dbCon(){
  // Retrieve database credentials from environment variables
  let username = process.env.DB_USER || "";
  let password = process.env.DB_PASSWORD || "";
  let database = process.env.DB_DATABASE || "";
  let host = process.env.DB_HOST || "";
  let port = 5432; // Default PostgreSQL port

  // Create a Sequelize instance for the database connection
  sequelize = await new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'postgres', // Specify the dialect (PostgreSQL in this case)
    ssl: false, // Disable SSL (modify as needed for your environment)
    dialectOptions: {
      ssl: {
        require: true, // SSL requirement
        rejectUnauthorized: false // Disable SSL certificate validation (for development)
      }
    },
    define: { underscored: true }, // Use underscored naming conventions
    pool: {
      max: 5, // Maximum number of connections in the pool
      min: 0, // Minimum number of connections in the pool
      acquire: 30000, // Maximum time, in milliseconds, that the pool will try to get connection before throwing error
      idle: 200000, // Maximum time, in milliseconds, that a connection can be idle before being released
    },
    logging: false, // Disable logging (modify as needed)
  });

  var db : any = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  // Authenticate the database connection
  await sequelize.authenticate().then(async () => {
    console.log(`DB Connected`);
  }).catch((err:any) => {
    console.log("Error", err);
  });

  // Define database models and associate them with the Sequelize instance
  Object.entries(pgModels).forEach(([key, value]:[any, any]) => {
    db[key] = value(sequelize, Sequelize);
  });

  // Synchronize the database (alter tables if needed)
  await sequelize.sync({ alter: true }).then((data:any) => {
    global.pg = db; // Set the global database object
    console.log("Global pg db object created");
  })
}

export default dbCon; // Export the database connection function
