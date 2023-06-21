import { mysqlConnection } from "../config/db.js";

const Product = {
  getAllProducts: () => {
    return new Promise((resolve, reject) => {
      let query = "SELECT product.id, product.name, product.description, product.category_id, product_category.name as category_name, original_price, discounted_price, rating, reviews, is_stock, trending, size, product.img, product.created_at, product.modified_at FROM product LEFT JOIN product_category ON product.category_id = product_category.id";
      mysqlConnection.query(query, (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT product.id, product.name, product.description, product.category_id, product_category.name as category_name, original_price, discounted_price, rating, reviews, is_stock, trending, size, product.img, product.created_at, product.modified_at FROM product LEFT JOIN product_category ON product.category_id = product_category.id WHERE product.id = ?";
      mysqlConnection.query(query, [id], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  }
}

export default Product;