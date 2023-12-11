import React from "react";
import { AddToDo } from "../AddToDo/AddToDo";
import './Todo.css'

const ToDo = () => {
    return (
        <div className="todo">
            <div className="heading">TASK MANAGER</div>
            <AddToDo/>
        </div>
    );
};

export default ToDo;
