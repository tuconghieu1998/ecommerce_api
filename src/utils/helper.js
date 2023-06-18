import moment from "moment/moment.js";

const helpers = {
  getCurrentTimeStamp: function() {
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  }
}

export default helpers;