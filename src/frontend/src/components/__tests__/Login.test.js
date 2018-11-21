import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../../user/Login';
import '../../index';

const mock = new MockAdapter(axios);
const username = 'Valdemar Forsberg';

describe('Testing correct state change after Login', () => {
  it('correct login credentials should leed to correct page in state', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 0,
    });
    await Login(username, 'password');
    const actState = store.getState();
    expect(actState.page).toEqual('form');
  });

  it('correct login credentials should leed to correct username in state', async () => {
    const actState = store.getState();
    expect(actState.user).toEqual(username);
  });

  it('incorrect login credentials should leed to correct page in state', async () => {
    mock.onPost('/login').reply(200, {
      user: {
        username,
      },
      error: 1,
    });
    await Login(username, 'password');
    const actState = store.getState();
    expect(actState.errorMsg).toEqual('Wrong login credentials.');
  });
});
