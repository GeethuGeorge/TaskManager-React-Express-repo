import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ToDoItem.css";

export const ToDoItem = ({ todoItem, editHandler, deleteHandler, strikeHandler}) => {
    return (
        <ul className="tododitem">
            {todoItem.map((item) => {
                return (
                  <li className="item" key={item.id}> {/* Use <li> for list items */}
                        <p className={item.isStrike ? "completed": ""} onClick={() => strikeHandler(item.id)}>{item.text}</p>
                  <div className="pen" onClick={() => editHandler(item.id)}>
                      <FontAwesomeIcon className="icon" icon={faPen} />
                  </div>
                  <div className="trash"  onClick={() => deleteHandler(item.id)}>
                      <FontAwesomeIcon className="icon" icon={faTrash} />
                  </div>
                 </li>
                 
                );
            })}
        </ul>
    );
};
