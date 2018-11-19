import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Logout from '../../user/Logout';
import RestPoints from '../../user/Init';

const mock = new MockAdapter(axios);
const username = "Valdemar Forsberg";

describe('Testing Logout Connection to rest api', () => {
    it('Logout should return true if api says logout was successful', async () => {
        mock.onPost(RestPoints.logout).reply(200, {
            success: true
        });
        const actReturn = await Logout(username);
        expect(actReturn).toEqual(true);
    });
    it('Logout should return false if api says logout was not successful', async () => {
        mock.onPost(RestPoints.logout).reply(200, {
            success: false
        });
        const actReturn = await Logout(username);
        expect(actReturn).toEqual(false);
    });
});
