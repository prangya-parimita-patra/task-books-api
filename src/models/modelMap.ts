// Define an object called "pgModels" that associates model names with their respective module imports
let pgModels = {
    "books": require("./books") // "books" is the model name, and "./books" is the module import for that model
  }
  
  // Export the "pgModels" object for use in other parts of the application
  export {
    pgModels
  }
  