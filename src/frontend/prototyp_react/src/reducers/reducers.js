const defaultInputsState = {
    inputs: [
        {
            name: "Skill",
            value: "",
            className: "skill",
            error: false,
            type: "text"
        },
        {
            name: "Date",
            value: "",
            className: "date",
            error: false,
            type: "date"
        },
        {
            name: "Note",
            value: "",
            className: "textarea",
            error: false,
            type: "textarea"
        }
    ],
    page: "form"
    };

export const formState = (state = defaultInputsState, action) => {
    switch(action.type){
        case 'UPDATEINPUT':
            return Object.assign({}, state, {
                inputs: [
                    ...state.inputs.slice(0, action.index),
                    Object.assign({}, state.inputs[action.index], {value: action.input}),
                    ...state.inputs.slice(action.index + 1)  
                ]
            });
        case 'SWITCHPAGE':
            return Object.assign({}, state, {page: action.page});
        
        case 'SETERROR':
            return Object.assign({}, state, {
                inputs: [
                    ...state.inputs.slice(0, action.index),
                    Object.assign({}, state.inputs[action.index], {error: action.error}),
                    ...state.inputs.slice(action.index + 1)  
                ]
            });
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