import { mysqlConnection } from "../config/db.js";

const Cart = {
  getItemsInCart: (userId) =>{
    return new Promise((resolve, reject) => {
      let query = "SELECT id, user_id, product_id, quantity, created_at, modified_at FROM cart_item WHERE user_id = ? AND is_deleted = '0'";
      mysqlConnection.query(query, [userId], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  getItem: (id) =>{
    return new Promise((resolve, reject) => {
      let query = "SELECT id, user_id, product_id, quantity, created_at, modified_at FROM cart_item WHERE id = ? AND is_deleted = '0'";
      mysqlConnection.query(query, [id], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  getItemByUserAndProductId: (userId, productId) =>{
    return new Promise((resolve, reject) => {
      let query = "SELECT id, user_id, product_id, quantity, created_at, modified_at FROM cart_item WHERE user_id = ? AND product_id = ? AND is_deleted = '0'";
      mysqlConnection.query(query, [userId, productId], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  addItem: (userId, productId, quantity) => {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO cart_item (user_id, product_id, quantity) VALUES (?, ?, ?)";
      mysqlConnection.query(query, [userId, productId, quantity], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  updateQuantityItem: (id, quantity) => {
    return new Promise((resolve, reject) => {
      let query = "UPDATE cart_item SET quantity = ? WHERE id = ?";
      mysqlConnection.query(query, [quantity, id], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  removeItem: function(id) {
    return new Promise((resolve, reject) => {
      let query = "UPDATE cart_item SET is_deleted = '1' WHERE id = ?";
      mysqlConnection.query(query, [id], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  clearCart: function(userId) {
    return new Promise((resolve, reject) => {
      let query = "UPDATE cart_item SET is_deleted = '1' WHERE user_id = ? AND is_deleted = '0'";
      mysqlConnection.query(query, [userId], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  }
}

export default Cart;