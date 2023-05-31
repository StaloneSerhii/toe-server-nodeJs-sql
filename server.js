const app = require("./app");
const mysql = require("mysql2");
const { DB_HOST } = process.env;

const connection = mysql.createConnection(DB_HOST);

connection.connect((error) => {
  if (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
  app.set("connection", connection);
  app.listen(3000);
  console.log("Database connection successful");
});

module.exports = connection.promise();
