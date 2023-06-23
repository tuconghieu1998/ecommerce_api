import { mysqlConnection } from "../config/db.js";

const Wishlist = {
  getWishlistItems: (userId) =>{
    return new Promise((resolve, reject) => {
      let query = "SELECT wish_list.id as id, user_id, product_id, product.name, product.img, product.original_price, product.discounted_price, product.size, product.rating, product.reviews, product.is_stock, product.trending, product.size, product_category.id as category_id, product_category.name as category_name, wish_list.created_at, wish_list.modified_at FROM wish_list LEFT JOIN product ON wish_list.product_id = product.id LEFT JOIN product_category ON product.category_id = product_category.id WHERE wish_list.user_id = ? AND wish_list.is_deleted = '0'";
      mysqlConnection.query(query, [userId], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  getItemByUserAndProductId: (userId, productId) =>{
    return new Promise((resolve, reject) => {
      let query = "SELECT id, user_id, product_id, created_at, modified_at FROM wish_list WHERE user_id = ? AND product_id = ? AND is_deleted = '0'";
      mysqlConnection.query(query, [userId, productId], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  addItem: (userId, productId) => {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO wish_list (user_id, product_id) VALUES (?, ?)";
      mysqlConnection.query(query, [userId, productId], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  getItem: (id) =>{
    return new Promise((resolve, reject) => {
      let query = "SELECT id, user_id, product_id, created_at, modified_at FROM wish_list WHERE id = ? AND is_deleted = '0'";
      mysqlConnection.query(query, [id], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  updateStatusItem: (id, isDeleted) => {
    return new Promise((resolve, reject) => {
      let query = "UPDATE wish_list SET is_deleted = ? WHERE id = ?";
      mysqlConnection.query(query, [isDeleted, id], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  }
}

export default Wishlist;