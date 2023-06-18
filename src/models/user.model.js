import { mysqlConnection } from "../config/db.js";

const User = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      let query = "SELECT id, username, first_name, last_name, telephone, created_at, modified_at FROM user WHERE 1";
      mysqlConnection.query(query, (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT id, username, first_name, last_name, telephone, created_at, modified_at FROM user WHERE id = ?";
      mysqlConnection.query(query, [id], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  getUserByUsername: (username) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT id, username, first_name, last_name, telephone, created_at, modified_at FROM user WHERE username = ?";
      mysqlConnection.query(query, [username], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  },

  createUser: (body) => {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO user (username, password, first_name, last_name, telephone) VALUES (?, ?, ?, ?, ?)";
      mysqlConnection.query(query, [body.username, body.password, body.first_name, body.last_name, body.telephone], (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  }
}

export default User;