import mysql from "mysql";
import {products} from "./datasample.js";

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
        // importProducts();
    }
}

export const importProducts = async() => {
    let values = [];
    let categories = {
        "men": 1,
        "women": 2,
        "kid": 3
    }
    for(let i = 0;i< products.length;i++) {
        values.push([]);
        values[i].push(products[i].name);
        values[i].push(products[i].description);
        values[i].push(categories[products[i].category_name]);
        values[i].push(products[i].original_price);
        values[i].push(products[i].discounted_price);
        values[i].push(products[i].rating);
        values[i].push(products[i].reviews);
        values[i].push(products[i].is_stock);
        values[i].push(products[i].trending);
        values[i].push(products[i].size);
        values[i].push(products[i].img);
    }
    var sql = "INSERT INTO product (name, description, category_id, original_price, discounted_price, rating, reviews, is_stock, trending, size, img) VALUES ?";
  mysqlConnection.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log(values.length, " record inserted");
  });
}

export default connectDB;
