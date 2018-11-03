// reducers >> index.js

const defaultState = {
    inputs: [
        {
            name: "test",
            value: "test",
        },
        {
            name: "test",
            value: "test",
        },
    ],
    };

export const formState = (state = defaultState, action) => {
    switch(action.type){
        case 'UPDATEINPUT':
            let inputs = [
                ...state.inputs.slice(0, action.payload.index),
                action.payload.input,
                ...state.inputs.slice(action.payload.index + 1)
            ];
            
            return {
                inputs: inputs
            };
        default:
            return state;
    }
}