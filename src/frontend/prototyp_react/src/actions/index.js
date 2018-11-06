// actions >> index.js

export const updateInput = (index, input) => ({
    type: "UPDATEINPUT",
    index: index,
    input: input
});

export const setError = (index, error) => ({
    type: "SETERROR",
    index: index,
    error: error
})

export const switchPage = (page) => ({
    type: "SWITCHPAGE",
    page: page
});