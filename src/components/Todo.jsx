import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Todo() {
  const [tasklist, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

// Load TODOs from local storage on app startup
useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem("tasklist"));
  if (storedTodos) {
    setTasks(storedTodos);
  }
}, []);

// Update local storage whenever TODOs change
useEffect(() => {
  localStorage.setItem("tasklist", JSON.stringify(tasklist));
}, [tasklist]);

//handling the input when the event is changes/triggerd
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

//With this function a new task is added ..trim() function removes and white space and checks the task if not empty then it is added to the tasklist array
  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasklist, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

//wit this a task is removed using the index of that task in the array. splice() function removes one element of the given index
  const deleteTask = (index) => {
    const updatedTasks = [...tasklist];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

//with this function a task is edited using the index of that task in the array and the new text is passed to the editTask function. This function updates the tasklist array. 
  const editTask = (index, newText) => {
    const updatedTasks = [...tasklist];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

//with this function a task is completed using the index of that task in the array. This function updates the tasklist array.
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasklist];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-white text-4xl font-semibold my-2">Todo App</h1>
      <Input
        type="text"
        value={taskInput}
        onChange={handleInputChange}
        placeholder="Enter task"
        size="md"
        className="mb-3 w-80"
      />
      <Button radius="md" size="md" variant="ghost" onClick={addTask}>
        Add Task
      </Button>
      <div className="mt-4">
        <ul className={"list-disc list-inside w-full"}>
          {/* //tasklist array is mapped and each item in array is todo with the certain given index */}
          {tasklist.map((todo, index) => (
            <li
              key={index}
              className={`flex flex-row gap-5 justify-between text-white text-xl p-2 ${todo.completed ? 'line-through' : ''}`}
              onClick={() => toggleTaskCompletion(index)}

            >
              {todo.text}
              <div className="">
                <Button onClick={() => deleteTask(index)} isIconOnly className="">
                  <MdDelete />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    editTask(index, prompt("Edit task", todo.text));
                  }}
                  isIconOnly
                >
                  <FaEdit />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
