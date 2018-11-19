import axios from 'axios';

class RestCom{
    constructor(restPoint, data){
        this.restPoint = restPoint;
        this.data = data;
    }

    errorHandler(error){
        console.error(error);
    }

    async post(){
        const response = await axios.post(this.restPoint, this.data)
            .catch(error => {
                console.log('Error: '+error);
            });
        
        return response;
    }
}

export default RestCom;

