// actions >> index.js

export const updateInput = (id, input) => ({
    type: "UPDATEINPUT",
    id: id,
    input: input
});

export const setError = (id, error) => ({
    type: "SETERROR",
    id: id,
    error: error
})

export const switchPage = (page) => ({
    type: "SWITCHPAGE",
    page: page
});

export const resetForm = () => ({
    type: "RESETFORM",
});