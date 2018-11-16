import RestPoints from './Init';
import RestCom from './Rest';

import {switchPage} from '../actions'; 

export default function (username, password)
{
    const user = {
        username,
        password
    }

    const Rest = new RestCom(RestPoints.login, user, userDataIntoStore);
    Rest.post();
}


const userDataIntoStore = (response) => {
    console.log(response.data);
}