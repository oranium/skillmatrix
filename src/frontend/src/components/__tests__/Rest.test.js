import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RestCom from 'rest/Rest';
import RestPoints from 'rest/Init';

console.log(RestPoints.login);

const apiUrl = `http://127.0.0.1:80${RestPoints.login}`;

const mock = new MockAdapter(axios);
const username = 'Valdemar Forsberg';
describe('Testing Login Connection to rest api', () => {
  it('Login should return correct error Msg for error code 400', async () => {
    mock.onPost(apiUrl).reply(400, {
      user: {
        username,
      },
    });
    const Rest = new RestCom(RestPoints.login, 'password');
    try {
      await Rest.post();
    } catch (error) {
      expect(error.message).toEqual('Wrong login credentials.');
    }
  });

  it('Login should return correct error Msg for error code 404', async () => {
    mock.onPost(apiUrl).reply(404, {
      user: {
        username,
      },
      error: 404,
    });
    const Rest = new RestCom(RestPoints.login, 'password');
    try {
      await Rest.post();
    } catch (error) {
      expect(error.message).toEqual('Couldnt connect to Server. Please try again.');
    }
  });

  it('Login should return correct error Msg for error code 504', async () => {
    mock.onPost(apiUrl).reply(504, {
      user: {
        username,
      },
      error: 504,
    });
    const Rest = new RestCom(RestPoints.login, 'password');
    try {
      await Rest.post();
    } catch (error) {
      expect(error.message).toEqual('Active Directory timeout. Please try again.');
    }
  });

  it('Login should return correct error Msg for error code 520', async () => {
    mock.onPost(apiUrl).reply(520, {
      user: {
        username,
      },
    });
    const Rest = new RestCom(RestPoints.login, 'password');
    try {
      await Rest.post();
    } catch (error) {
      expect(error.message).toEqual('An unknown error occured. Please try again.');
    }
  });

  it('Login should return correct error Msg for unknown error code', async () => {
    mock.onPost(apiUrl).reply(999, {
      user: {
        username,
      },
    });
    const Rest = new RestCom(RestPoints.login, 'password');
    try {
      await Rest.post();
    } catch (error) {
      expect(error.message).toEqual('An unknown error occured. Please try again.');
    }
  });
});
