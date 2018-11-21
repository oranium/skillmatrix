import RestPoints from './Init';
import RestCom from './Rest';

export default async function (username, password) {
  // map data to get the right data structure for posting to server
  const loginCredentials = {
    username,
    password,
  };

  let response = {};

  try {
    const Rest = new RestCom(RestPoints.login, loginCredentials);
    // post and get response from server
    const { data } = await Rest.post();
    const { user } = data;
    response = {
      user,
      success: true,
    };
  } catch (e) {
    const errorMsg = e.message;
    response = {
      errorMsg,
      success: false,
    };
  }

  return response;
}
