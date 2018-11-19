import RestPoints from './Init';
import RestCom from './Rest';

export default async function (username)
{
    // map data to get the right data structure for posting to server
    const user = {
        username
    }

    const Rest = new RestCom(RestPoints.logout, user);

    //post and get response from server
    const response = await Rest.post();

    return response === undefined ? false : response.data.success; 
}