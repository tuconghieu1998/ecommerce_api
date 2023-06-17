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
  }
}

export default User;