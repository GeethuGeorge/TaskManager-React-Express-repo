import React from "react";
import "./InputText.css";

export const InputText = ({inputHandler,todo}) => {
    return (
        <div className="inputText">
            <input type="text" placeholder="New ToDo"  value={todo} onChange={inputHandler} />
        </div>
    );
};
