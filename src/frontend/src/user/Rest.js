import axios from 'axios';

const config = require('../config.json');

const errorCodesToErrorMsg = (errorCode) => {
  switch (errorCode) {
    case 404:
      return 'Server does not answer.';
    default:
      return 'Unknown error occured. Please try again.';
  }
};

class RestCom {
  constructor(restPoint, data) {
    this.restApi = config + restPoint;
    this.data = data;
  }

  async post() {
    const response = await axios.post(this.restApi, this.data).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw errorCodesToErrorMsg(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

    return response;
  }
}
export default RestCom;
