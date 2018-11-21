import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../../user/Login';

const mock = new MockAdapter(axios);
const username = 'Valdemar Forsberg';

describe('Testing Login Connection to rest api', () => {
  it('Login should return empty error message and correct username for error code 0', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 0,
    });
    const response = await Login(username, 'password');
    const actMsg = response.errorMsg;
    expect(actMsg).toEqual('');

    expect(response.user.username).toEqual(username);
  });

  it('Login should return correct error Msg for error code 1', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 1,
    });
    const response = await Login(username, 'password');
    const actMsg = response.errorMsg;
    expect(actMsg).toEqual('Wrong login credentials.');
  });

  it('Login should return correct error Msg for error code 2', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 2,
    });
    const response = await Login(username, 'password');
    const actMsg = response.errorMsg;
    expect(actMsg).toEqual('Please fill in all form fields.');
  });

  it('Login should return correct error Msg for error code 3', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 3,
    });
    const response = await Login(username, 'password');
    const actMsg = response.errorMsg;
    expect(actMsg).toEqual('Server Timeout. Please try again.');
  });

  it('Login should return correct error Msg for unknown error code', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 100,
    });
    const response = await Login(username, 'password');
    const actMsg = response.errorMsg;
    expect(actMsg).toEqual('An unknown Error occurred. Please try again.');
  });
});
