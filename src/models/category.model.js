import { mysqlConnection } from "../config/db.js";

const Category = {
  getAllCategories: () => {
    return new Promise((resolve, reject) => {
      let query = "SELECT id, name, description, created_at, modified_at FROM product_category WHERE 1";
      mysqlConnection.query(query, (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  getCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT id, name, description, created_at, modified_at FROM product_category WHERE id = ?";
      mysqlConnection.query(query, [id], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },
}

export default Category;