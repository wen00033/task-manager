import "./AddTask.css";
import { X } from "lucide-react";
import db from "../utils/data";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

function AddTask({ refetch }: any & { refetch: () => void }) {
  const [popup, setPopup] = useState(false);
  const status = ["select your status", "todo", "doing", "done"];
  const [task, setTask] = useState({} as any);
  const [subtaskArray, setSubtaskArray] = useState([] as any);
  const [subtask, setSubtask] = useState("");
  const ID = useReadLocalStorage("docID");
  const taskWindowHandler = function () {
    setPopup(!popup);
  };
  // bugs for subtask can not updated immediately

  function addTaskHandler(e: any) {
    task.status = "select your status";
    setTask({
      ...task,
      [e.target.name]: e.target.value,
      subtask: subtaskArray,
      time: new Date().toLocaleString(),
    });
  }
  async function addTaskToDb(e: any) {
    if (task.status === "select your status") {
      alert("select your status");
    }
    e.preventDefault();
    const docRef = doc(db, "Task-Manager", `${ID}`);
    await updateDoc(docRef, {
      taskList: arrayUnion(task),
    });
    setSubtaskArray([]);
    setPopup(!popup);
    refetch();
  }

  function addSubtaskHandler(e: any) {
    e.preventDefault();
    if (subtask === "") return;
    setSubtaskArray([...subtaskArray, { subtask: subtask, status: false }]);
    setSubtask("");
  }
  function deleteSubtaskHandler(e: any) {
    e.preventDefault();
    setSubtaskArray(
      subtaskArray.filter(
        (task: any) => task.subtask !== e.target.dataset.store
      )
    );
  }

  return (
    <>
      <header className="platform-header">
        <h2 className="platform-title">tasks launch</h2>
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
                subtaskArray.map((subtask: any, index: number) => (
                  <div className="subtask" key={index}>
                    <input disabled value={subtask.subtask} />
                    <X
                      className="subtask-delete-button"
                      data-store={subtask.subtask}
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
                {status.map((task: any, index: number) => (
                  <option key={index} value={task}>
                    {task}
                  </option>
                ))}
              </select>

              <button onClick={addTaskToDb}>Add New task</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
export default AddTask;
