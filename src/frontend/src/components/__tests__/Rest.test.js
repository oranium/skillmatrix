import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RestCom from '../../rest/Rest';


const mock = new MockAdapter(axios);
const username = 'Valdemar Forsberg';
describe('Testing Login Connection to rest api', () => {
  it('Login should return correct error Msg for error code 400', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 400,
    });
    try {
      await new RestCom(username, 'password');
    } catch (error) {
      expect(error).toEqual('Wrong login credentials.');
    }
  });

  it('Login should return correct error Msg for error code 404', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 404,
    });
    try {
      await new RestCom(username, 'password');
    } catch (error) {
      expect(error).toEqual('Couldnt connect to Server. Please try again.');
    }
  });

  it('Login should return correct error Msg for error code 504', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 504,
    });
    try {
      await new RestCom(username, 'password');
    } catch (error) {
      expect(error).toEqual('Active Directory timeout. Please try again.');
    }
  });

  it('Login should return correct error Msg for error code 520', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 520,
    });
    try {
      await new RestCom(username, 'password');
    } catch (error) {
      expect(error).toEqual('An unknown error occured. Please try again.');
    }
  });

  it('Login should return correct error Msg for unknown error code', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 999,
    });
    try {
      await new RestCom(username, 'password');
    } catch (error) {
      expect(error).toEqual('An unknown error occured. Please try again.');
    }
  });
});
