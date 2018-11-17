import RestPoints from './Init';
import RestCom from './Rest';

import store from '../Store';
import {switchPage, setUsername, setLoginError} from '../actions'; 

// export default class Login {
    

//     login (username, password){
//         const loginData = {
//             username,
//             password
//         }

//         const api = new RestCom(RestPoints.login, loginData, this.prozessLogin);
//         api.post();
//     }

//     prozessLogin(response){
//         console.log(response.data);
//     }
// }

export default function (username, password)
{
    const user = {
        username,
        password
    }

    const Rest = new RestCom(RestPoints.login, user, prozessLogin);
    Rest.post();

    return true;
}


const prozessLogin = (response) => {
    console.log(response.data);
    let user = response.data.user;
    let error = response.data.error;
    switch (error){
        case 0:
            console.log(user.username);
            store.dispatch(setUsername(user.username));
            store.dispatch(switchPage('form'));
            break;
        case 1:
            store.dispatch(setLoginError("Wrong login credentials."));
            break;
        case 2:
            store.dispatch(setLoginError("Please fill in all form fields."));
            break;
        case 3:
            store.dispatch(setLoginError("Server Timeout. Please try again."));
            break;
        default:
            store.dispatch(setLoginError("An unknown Error occurred. Please try again."));
            break;
    }
}