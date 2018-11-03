// actions >> index.js

export const updateInput = ({i, input}) => ({
    type: "UPDATEINPUT",
    payload: {
        id: i,
        input: input,
    }
});