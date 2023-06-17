import mysql from "mysql";

export const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce"
  });

const connectDB = async () => {
    try {
        await mysqlConnection.connect();
    }
    catch(e) {
        console.log(err);
    }
    finally {
        console.log("Connected MySQL Database!");
    }
}

export default connectDB;
