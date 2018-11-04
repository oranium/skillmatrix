const defaultInputsState = {
    inputs: [
        {
            name: "skill",
            value: "",
            type: "text"
        },
        {
            name: "date",
            value: "",
            type: "date"
        },
        {
            name: "textarea",
            value: "",
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