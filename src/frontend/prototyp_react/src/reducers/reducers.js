const defaultInputsState = {
    inputs: {
       textfield: {
            name: "Skill",
            value: "",
            error: false,
            type: "text"
        },
        datefield: {
            name: "Date",
            value: "",
            error: false,
            type: "date"
        },
        textarea: {
            name: "Note",
            value: "",
            error: false,
            type: "textarea"
        }
    }
};

export const formState = (state = defaultInputsState, action) => {
    switch(action.type){
        case 'UPDATEINPUT':
            return Object.assign({}, state, {
                inputs: Object.assign({}, state.inputs, {
                    [action.id]: Object.assign({}, state.inputs[action.id], {value: action.input})
                }),
            });
        
        case 'SETERROR':
            console.log(action);
            return Object.assign({}, state, {
                inputs: Object.assign({}, state.inputs, {
                    [action.id]: Object.assign({}, state.inputs[action.id], {error: action.error})
                }),
            });
        case 'RESETFORM':
            return defaultInputsState;

        default:
            return state;
    }
}

export const user = (state = "Valdemar Forsberg", action) => {
    switch(action.type){
        case 'UPDATEUSERNAME':
            return action.username;
    
        default: 
            return state;
    }
}

export const page = (state = "form", action) => {
    switch(action.type){
        case 'SWITCHPAGE':
            return action.page;
        default: 
            return state;
    }
}