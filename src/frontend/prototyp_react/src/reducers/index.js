// reducers >> index.js

const defaultState = {
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
    };

export const formState = (state = defaultState, action) => {
    switch(action.type){
        case 'UPDATEINPUT':
            return Object.assign({}, state, {
                inputs: [
                    ...state.inputs.slice(0, action.index),
                    Object.assign({}, state.inputs[action.index], {value: action.input}),
                    ...state.inputs.slice(action.index + 1)  
                ]
            });
        default:
            return state;
    }
}