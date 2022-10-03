import { createSlice } from "@reduxjs/toolkit";

import { todoData } from "../fakeData";

export const todoSlice = createSlice({
    name: "todos",
    initialState: { text: todoData },
    reducers: {
        addTodo: (state, action) => {
            state.text.push(action.payload);

            console.log(state);
            console.log(action);
        },

        deleteTodo: (state, action) => {
            state.text = state.text.filter(
                (todo) => todo.id !== action.payload.id
            );
        },

        updateTodo: (state, action) => {
            state.text.map((v, i) => {
                if (v.id === action.payload.id) {
                    v.text = action.payload.text;
                }
            });
        },

        checkTodo: (state, action) => {
            const index = state.text.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state.text[index].complete = action.payload.complete;
        },

        editTodo: (state, action) => {
            const index = state.text.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state.text[index].edit = action.payload.edit;
        },
    },
});

export const { addTodo, deleteTodo, updateTodo, checkTodo, editTodo } =
    todoSlice.actions;
export default todoSlice.reducer;
