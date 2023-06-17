import mysql from "mysql";

const connectDB = async () => {
    try {
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "ecommerce"
          });
          
          await con.connect();
    }
    catch(e) {
        console.log(err);
    }
    finally {
        console.log("Connected MySQL Database!");
    }
}

export default connectDB;
