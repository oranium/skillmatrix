import axios from 'axios';

const config = require('../config.json');

const errorCodesToErrorMsg = (errorCode) => {
  switch (errorCode) {
    case 400:
      return 'Wrong login credentials.';
    case 404:
      return 'Couldnt connect to Server. Please try again.';
    case 504:
      return 'Active Directory timeout. Please try again.';
    case 520:
      return 'An unknown error occured. Please try again.';
    default:
      return 'An unknown error occured. Please try again.';
  }
};

class RestCom {
  constructor(restPoint, data) {
    this.restApi = config + restPoint;
    this.data = data;
  }

  async post() {
    const response = await axios.post(this.restApi, this.data).catch((error) => {
      let errorMsg;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMsg = errorCodesToErrorMsg(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorMsg = 'An error occured while connecting to the server. Please check your Internet connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMsg = errorCodesToErrorMsg(520);
      }
      throw new Error(errorMsg);
    });

    return response;
  }
}
export default RestCom;
