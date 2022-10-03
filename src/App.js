import "./App.css";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import {
    addTodo,
    deleteTodo,
    updateTodo,
    checkTodo,
    editTodo,
} from "./reducer/todoReducer";

function App() {
    const todoList = useSelector((state) => state.todos.text);
    const dispatch = useDispatch();
    const [todo, setTodo] = useState("");
    const inputRef = useRef();

    return (
        <>
            <div className="todo-wrapper">
                <h3 className="todo-title">Todo List</h3>
                <div className="add-todo">
                    <input
                        className="todo-input"
                        type="text"
                        onChange={(event) => {
                            setTodo(event.target.value);
                        }}
                        ref={inputRef}
                    />
                    <button
                        onClick={() => {
                            dispatch(
                                addTodo({
                                    id: todoList[todoList.length - 1].id + 1,
                                    text: todo,
                                    complete: false,
                                    edit: false,
                                })
                            );

                            inputRef.current.value = "";
                        }}
                        className="add-todo-btn"
                    >
                        新增
                    </button>
                </div>
                <div className="todo-list">
                    {todoList.map((v, i) => {
                        return (
                            <div className="list-item" key={v.id}>
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={v.complete}
                                        onChange={() => {
                                            dispatch(
                                                checkTodo({
                                                    id: v.id,
                                                    complete: !v.complete,
                                                })
                                            );
                                        }}
                                    ></input>
                                    <span className="checkmark"></span>
                                </label>
                                <input
                                    className={`edit-input ${
                                        v.edit ? "todo-editing" : ""
                                    } ${v.complete ? "todo-checked" : ""}`}
                                    type="text"
                                    onChange={(event) => {
                                        setTodo(event.target.value);
                                    }}
                                    defaultValue={v.text}
                                    readOnly={!v.edit}
                                    style={
                                        v.complete
                                            ? {
                                                  textDecoration:
                                                      "line-through",
                                              }
                                            : {}
                                    }
                                />
                                <button
                                    onClick={() => {
                                        dispatch(
                                            updateTodo({
                                                id: v.id,
                                                text: todo,
                                            })
                                        );

                                        dispatch(
                                            editTodo({
                                                id: v.id,
                                                edit: !v.edit,
                                            })
                                        );
                                    }}
                                    className="todo-edit"
                                >
                                    {v.edit ? "更新" : "編輯"}
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(deleteTodo({ id: v.id }));
                                    }}
                                    className="todo-delete"
                                >
                                    刪除
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default App;
