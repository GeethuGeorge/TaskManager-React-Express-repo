import React, { useEffect } from "react";
import { InputText } from "../InputText/InputText";
import { ButtonToDo } from "../ButtonToDo/ButtonToDo";
import { ToDoItem } from "../ToDoItem/ToDoItem";
import { EditText } from "../Edit/EditText";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./AddToDo.css";
import { useState } from "react";

//--------------------------------------------------
export const AddToDo = () => {
    const [todo, settodo] = useState("");
    const [todoItem, settodoItem] = useState([]);
    const [todoUpdate, setTodoUpdate] = useState("");

    const API_URL = "http://localhost:3005/api/todo";

    //--------------------------------------------------
    const fetchToDo = async () => {
        try {
            const response = await axios(API_URL);
            console.log(response.data, "==response");
            settodoItem(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    //USEEFFECT
    useEffect(() => {
        fetchToDo();
    }, []);

    //--------------------------------------------------

    //Input value
    const inputHandler = (event) => {
        settodo(event.target.value);
    };

    //Add toDo Button
    const addtodoHandler = async (event) => {
        event.preventDefault();

        try {
            if (todo) {
                //if the todo state has value
                const response = await axios(API_URL, {
                    method: "POST",
                    data: {
                        text: todo,
                    },
                });
                settodoItem(response.data);
                settodo("");
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    //------------------------------------------------------

    //edit Handler

    //updateHandler
    const updateHandler = (event) => {
        setTodoUpdate(event.target.value);
    };

    //--------------------------

    const editHandler = async (elemID) => {
        const updatedItems = todoItem.map((item) => {
            if (item.id === elemID) {
                return { ...item, isEditing: !item.isEditing };
            }
            return item;
        });

        settodoItem(updatedItems);
        setTodoUpdate("");
        console.log(todoItem);
    }; 


    //---------------------------------------------------

    //Strike handler
    const strikeHandler = (elemID) => {
        const updatedItems = todoItem.map((item) => {
            if (item.id === elemID) {
                return { ...item, isStrike: !item.isStrike };
            }
            return item;
        });

        settodoItem(updatedItems);
    };

    //save Handler
    const saveHandler = async (elemID) => {
        const response = await axios(API_URL, {
            method: "PUT",
            data: {
                id: elemID,
                text: todoUpdate,
                isStrike: false,
                isEditing: false,
            },
        });
        console.log(response.data);
        settodoItem(response.data);
    };

    //cancel handler
    const cancelHandler = (elemID) => {
        const cancelItem = todoItem.map((item) => {
            if (item.id === elemID) {
                return { ...item, isEditing: !item.isEditing };
            }
            else{   
                return item;
            }
        });
        settodoItem(cancelItem);
    };
    //delete handler
    const deleteHandler = async (elemID) => {
        const filteredItems = todoItem.filter((item) => {
            return item.id !== elemID;
        });

        const response = await axios(API_URL, {
            method: "DELETE",
            data: {
                id: elemID,
            },
        });
        console.log(response.data);

        settodoItem(response.data);
    };

    return (
        <div className="addtodo">
            {todoItem.some((item) => item.isEditing) ? (
                <EditText
                    editHandler={editHandler}
                    todo={todo}
                    addtodoHandler={addtodoHandler}
                    todoItem={todoItem}
                    strikeHandler={strikeHandler}
                    deleteHandler={deleteHandler}
                    updateHandler={updateHandler}
                    saveHandler={saveHandler}
                    cancelHandler={cancelHandler}
                    todoUpdate={todoUpdate}
                />
            ) : (
                <>
                    <InputText inputHandler={inputHandler} todo={todo} />
                    <ButtonToDo addtodoHandler={addtodoHandler} />
                    <ToDoItem
                        todoItem={todoItem}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                        strikeHandler={strikeHandler}
                    />
                </>
            )}
        </div>
    );
};
