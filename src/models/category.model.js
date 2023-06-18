import { mysqlConnection } from "../config/db.js";
import { getCategoryById } from "../controllers/category.controller.js";

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

  updateCategoryDetailsById: (id, body) => {
    return new Promise((resolve, reject) => {
      let updateStr = '';
      if(body.name) {
        updateStr += "name = '"+ body.name + "'";
      }
      if(body.description) {
        if(updateStr!=''){
          updateStr +=', ';
        }
        updateStr += "description = '"+ body.description + "'";
      }
      if(updateStr == '') {
        return;
      }
      let query = "UPDATE product_category SET " + updateStr+ " WHERE id = ?";
      mysqlConnection.query(query, [id], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  createCategory: (body) => {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO product_category (name, description) VALUES (?, ?)";
      mysqlConnection.query(query, [body.name, body.description], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },
}

export default Category;