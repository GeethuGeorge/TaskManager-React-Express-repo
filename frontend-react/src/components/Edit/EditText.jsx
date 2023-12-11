import React from "react";
import "./EditText.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export const EditText = ({ inputHandler, todo, addtodoHandler, todoItem, strikeHandler, editHandler, deleteHandler, updateHandler, saveHandler,cancelHandler,todoUpdate }) => {
    return (
        <div className="edittext">
            <div className="inputText">
                <input type="text" placeholder="New ToDo" value={todo} onChange={inputHandler} />
            </div>
            <div className="buttontodo">
                <button className="todobutton" onClick={addtodoHandler}>
                    ADD ToDo
                </button>

                <ul className="tododitem">
                    {todoItem.map((item) => (
                        <li className="item" key={item.id}>
                            {item.isEditing ? (
                                <div className="editFormupdate">
                                      <p> <input type="text" placeholder="Editing current ToDo" onChange={updateHandler} value={todoUpdate}/></p>
                                    <button className="save" onClick={() =>saveHandler(item.id)}>SAVE</button>
                                    <button className="cancel" onClick={() =>cancelHandler(item.id)} >CANCEL</button>
                                </div>
                            ) : (
                                <div className="editFormNormal">
                                    <p className={item.isStrike ? "completed" : ""} onClick={() => strikeHandler(item.id)}>
                                        {item.text}
                                    </p>
                                    <div className="pen" onClick={() => editHandler(item.id)}>
                                        <FontAwesomeIcon className="icon" icon={faPen} />
                                    </div>
                                    <div className="trash" onClick={() => deleteHandler(item.id)}>
                                        <FontAwesomeIcon className="icon" icon={faTrash} />
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
