//default map for clean input fields
const defaultFormState = {
    textfield: {
        name: "Skill",
        value: "",
        error: false
    },
    levelfield: {
        name: "Level",
        value: "",
        error: false
    },
    datefield: {
        name: "Date",
        value: "",
        error: false
    },
    textarea: {
        name: "Note",
        value: "",
        error: false
    }
};

//has all the data for the inputfields
export const formState = (state = defaultFormState, action) => {
    switch(action.type){

        //return new state, where only the one value of the certain input field has changed to action.input
        case 'UPDATEINPUT':
            return Object.assign({}, state, {
                [action.id]: Object.assign({}, state[action.id], {value: action.input})
            });

        //return new state, where input field with action.id has a new bool
        case 'SETERROR':
            return Object.assign({}, state, {
                [action.id]: Object.assign({}, state[action.id], {error: action.error})
            });

        case 'RESETFORM':
            return defaultFormState;

        default:
            return state;
    }
}

//at the moment this only saves the username
export const user = (state = "Valdemar Forsberg", action) => {
    switch(action.type){
        case 'SETUSERNAME':
            console.log('action: ' + action.username);
            return action.username;
    
        default: 
            return state;
    }
}

//defines which page is viewed to the user
export const page = (state = "form", action) => {
    switch(action.type){
        case 'SWITCHPAGE':
            return action.page;
        default: 
            return state;
    }
}

export const errorMsg = (state="", action) => {
    switch(action.type){
        case 'SETLOGINERROR':
            return action.errorMsg;
        default:
            return state;
    }
}