// actions >> index.js

export const updateInput = (index, input) => ({
    type: "UPDATEINPUT",
    index: index,
    input: input
});

export const switchPage = (page) => ({
    type: "SWITCHPAGE",
    page: page
});