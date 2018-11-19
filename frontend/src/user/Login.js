import RestPoints from './Init';
import RestCom from './Rest';

export default async function (username, password)
{
    // map data to get the right data structure for posting to server
    const user = {
        username,
        password
    }

    const Rest = new RestCom(RestPoints.login, user);

    //post and get response from server
    const response = await Rest.post();

    return errorCodesToErrorMsg(response)
}


//translate error codes to error Msg and return a new map that looks like:
//response = {user: {username: String}, errorMsg: String, success: Bool}
const errorCodesToErrorMsg = (apiResponse) => {

    const response = {
        user: "",
        errorMsg: "",
        success: true
    }

    //there was an Error connecting:
    if (apiResponse === undefined){
        response.errorMsg = "An error occured while connecting to the database. Check your Internet connection.";
        response.success = false;
        return response;
    }

    const data = apiResponse.data;
    
    //looks like {user: {username: String, ....}}
    const user = data.user;

    //holds the error code
    const error = data.error;

    switch (error){
        case 0:
            response.user = user;
            response.success = true;
            break;
        case 1:
            response.errorMsg = "Wrong login credentials.";
            response.success = false;
            break;
        case 2:
            response.errorMsg = "Please fill in all form fields."
            response.success = false;
            break;
        case 3:
            response.errorMsg = "Server Timeout. Please try again.";
            response.success = false;
            break;
        default:
            response.errorMsg = "An unknown Error occurred. Please try again.";
            response.success = false;
            break;
    }
    return response;
}