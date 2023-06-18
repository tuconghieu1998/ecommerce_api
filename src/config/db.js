import mysql from "mysql";

const {MYSQL_HOST} = process.env;

export const mysqlConnection = mysql.createConnection({
    host: MYSQL_HOST,
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
