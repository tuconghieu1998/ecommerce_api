import { mysqlConnection } from "../config/db.js";

const User = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      mysqlConnection.query("SELECT * FROM user WHERE 1", (error, results) => {
        if(error) {
          return reject(error);
        }
        return resolve(results);
      });
    })
  }
}

export default User;