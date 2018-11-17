import axios from 'axios';

class RestCom{
    constructor(restPoint, data, successHandler){
        this.restPoint = restPoint;
        this.data = data;
        this.successHandler = successHandler;
    }

    errorHandler(error){
        console.error(error);
    }

    post(){
        axios.post(this.restPoint, this.data)
            .then(response => this.successHandler(response))
            .catch(error => {
                console.log('Error: '+error);
            });
    }
}

export default RestCom;

