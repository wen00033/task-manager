import "./AddTask.css";
import { X } from "lucide-react";
import { useState } from "react";
import { AddNewSingleTask } from "./TaskManagerSlice";
import { useSelector, useDispatch } from "react-redux";

function AddTask() {
  const dispatch = useDispatch();
  // UI element does't need to be in redux
  const [popup, setPopup] = useState(false);
  const status = ["select your status", "todo", "doing", "done"];

  // ====set new task into redux management=============
  const [task, setTask] = useState({});
  const [subtaskArray, setSubtaskArray] = useState([]);
  const [subtask, setSubtask] = useState("");
  // =====Target to the correct id =============
  // If user didn't select any task, return null
  const id = useSelector((state) => state.TaskManager.currentTask.id);
  if (!id) return null;

  const taskWindowHandler = function () {
    setPopup(!popup);
  };

  function addSubtaskHandler(e) {
    e.preventDefault();
    if (subtask === "") return;
    setSubtaskArray([
      ...subtaskArray,
      { subtask: subtask, status: false, id: crypto.randomUUID() },
    ]);
    setSubtask("");
  }

  function addNewTaskHandler(e) {
    e.preventDefault();
    dispatch(AddNewSingleTask({ task, id }));
    setSubtaskArray("");
    setPopup(false);
  }

  // bugs for subtask can not updated immediately
  function addTaskHandler(e) {
    setTask({
      ...task,
      id: crypto.randomUUID(),
      [e.target.name]: e.target.value,
      time: new Date().toLocaleString(),
      subtask: subtaskArray,
    });
  }

  // ADD subtask with id to fix delete subtask bug

  function deleteSubtaskHandler(e) {
    e.preventDefault();
    console.log(e.target.dataset.id);
    setSubtaskArray(
      subtaskArray.filter((task) => task.id !== e.target.dataset.id)
    );
  }

  return (
    <>
      <header className="platform-header">
        <h2 className="platform-title">Add your Task🫡!</h2>
        <button onClick={taskWindowHandler} className="platform-button">
          Add task
        </button>
      </header>
      {popup && (
        <>
          <div onClick={taskWindowHandler} className="popup-background"></div>
          <div className="popup">
            <h2>Add new task</h2>
            <form className="add-task-popup">
              <span>Title</span>
              <input
                name="title"
                onChange={addTaskHandler}
                type="text"
                placeholder="title"
              />
              <span>Description</span>
              <input
                name="description"
                onChange={addTaskHandler}
                type="text"
                placeholder="description"
              />
              <span>Subtask</span>

              {subtaskArray &&
                subtaskArray.map((subtask, index) => (
                  <div className="subtask" key={index}>
                    <input disabled value={subtask.subtask} />
                    <X
                      className="subtask-delete-button"
                      data-id={subtask.id}
                      onClick={deleteSubtaskHandler}
                    >
                      Delete
                    </X>
                  </div>
                ))}
              <input
                onChange={(e) => setSubtask(e.target.value)}
                value={subtask}
                name="subtask"
                type="text"
                placeholder="Subtask"
              />
              <button onClick={addSubtaskHandler}>+Add New Subtasks</button>
              <span>Status</span>
              <select onChange={addTaskHandler} name="status">
                {status.map((task, index) => (
                  <option key={index} value={task}>
                    {task}
                  </option>
                ))}
              </select>
              <button onClick={addNewTaskHandler}>Add New Task</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
export default AddTask;
