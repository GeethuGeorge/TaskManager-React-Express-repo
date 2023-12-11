const { v4: uuidv4 } = require("uuid");
const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

const todoList = require("./todo.json");

//--------------------------------------------------------------------------
//get todo data when page loads
app.get("/api/todo", (req, res) => {
    res.status(200).json(todoList);
});
//--------------------------------------------------------------------------

//post todoItem
app.post("/api/todo", (req, res) => {
    //data passed via api from front end to back end via optional method and data to the req.body
    //req.body typically represents the data sent in the body of a POST or PUT or Delete request
    //Destructuring in JavaScript allows you to extract values from objects or arrays and assign them to variables in a more concise way.
    //here text has todo state value
    const { text } = req.body;
    console.log(req.body);

    //to ensure the req.boy has text property and not anything else like todos, if not display an error message
    //it should return here and stop otherwie it goes below and see one more res.json
    if (!("text" in req.body)) {
        return res.status(400).json({
            message: `${JSON.stringify(req.body)}: This attribute is not accepted: Required Attributes are : text`,
            code: "1234",
        });
        
    }
    //the properties used in front end should be the same as in backend

    const todoItem = {
        id: uuidv4(),
        text: text,
        isStrike: false,
        isEditing: false,
    };

    todoList.push(todoItem);

    res.json(todoList);
});
//--------------------------------------------------------------------------
//to update data, put method

app.put("/api/todo", (req, res) => {
    const { id, text, isStrike, isEditing } = req.body;

    //This kind of validation is common in API endpoints to ensure that the incoming data has the required structure before further processing. It helps prevent errors and ensures that the server receives the expected dat

    if(!("id" in req.body && "text" in req.body && "isStrike" in req.body && "isEditing" in req.body)){
        res.status(400).json({message: "Missting attributes : id , text, isStrike, isEditing"})
    }

    //returns object with the same id
    const isExist = todoList.find((data) => data.id === id);

    //if exist will edit only the data of that particular id
    //use for each since it wont retirn anything and we can directly manipulate the todolist
    //if an object exists with same id , do below, else dreturn status 404
    if (isExist) {
        todoList.forEach((todoItem) => {
            if (todoItem.id === id) {
                todoItem.text = text;
                todoItem.isStrike = isStrike;
                todoItem.isEditing = isEditing;
            }
        });
        return res.json(todoList);
    }
    res.status(404).json({ message: `item with this ${id} does not exist` });
});

//--------------------------------------------------------------------------

//Delete
app.delete("/api/todo", (req, res) => {
    const { id } = req.body;

    const todoIndex = todoList.findIndex((data) => data.id === id);
    if (todoIndex !== -1) {
        todoList.splice(todoIndex, 1);
        return res.json(todoList);
    }

    res.status(404).json({ message: `item with this ${id} does not exist` });
});

//----------------------------------------------------------------------------
app.get("*", (req, res) => {
    res.status(404).json("This Page doesnt exist");
});
//----------------------------------------------------------------------------
const PORT = 3005;
app.listen(3005, () => console.log("Server started in", `${PORT}`));
