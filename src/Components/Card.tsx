import { useState, useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import db from "../utils/data";
import "./card.css";
function Card({ taskList }: any & { title: string; task: [] }) {
  const [taskWindow, setTaskWindow] = useState(false);
  const [updateData, setUpdateData] = useState({} as any);
  const [subTask, setSubTask] = useState([] as any);
  const [newTaskList, setNewTaskList] = useState(taskList);
  const status = ["todo", "doing", "done"];

  const ID = useReadLocalStorage("docID");

  const taskWindowHandler = function () {
    setTaskWindow(!taskWindow);
  };

  function getCheckboxValues() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const values: any = [];
    checkboxes.forEach((checkbox: any) => {
      values.push({ status: checkbox.checked, subtask: checkbox.name });
    });
    const filterValues = values.filter((value: any) => value.subtask !== "");
    setSubTask(filterValues);
  }
  function updateNewData() {
    if (subTask.length === 0) return;
    const status = document.querySelector(
      ".select-status"
    ) as HTMLSelectElement;
    setNewTaskList({
      ...newTaskList,
      status: status.value,
      subtask: subTask,
    });
  }

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "Task-Manager", ID as string);
      const docSnap = await getDoc(docRef);
      let data = docSnap.data();
      if (data === undefined) return;
      setUpdateData(
        data.taskList.filter((task: any) => task.time !== newTaskList.time)
      );
    }
    fetchData();
  }, []);

  // console.log(updateData);

  // useEffect(() => {
  async function GetupdateData() {
    const docRef = doc(db, "Task-Manager", ID as string);
    await updateDoc(docRef, { taskList: [...updateData, newTaskList] });
    taskWindowHandler();
    location.reload();
  }

  return (
    <>
      <div onClick={taskWindowHandler} className="card">
        <h2>{taskList.title}</h2>
        <p>{` ${taskList.subtask.length} subtasks`}</p>
      </div>
      {taskWindow && (
        <>
          <div onClick={taskWindowHandler} className="popup-background"></div>
          <div className="popup">
            <h3>{taskList.title.toUpperCase()}</h3>

            <p>Description:{taskList.description}</p>
            {taskList.subtask.length > 0 && (
              <h3 className="popup-subtask-title">subtasks</h3>
            )}

            {taskList.subtask.length > 0 && (
              <form className="subtask-container">
                {newTaskList.subtask.map((task: any, index: number) => (
                  <label className="single-subtask" key={index}>
                    <input
                      onChange={getCheckboxValues}
                      type="checkbox"
                      name={task.subtask}
                    />
                    {task.status ? (
                      <del>{task.subtask}</del>
                    ) : (
                      <h4>{task.subtask}</h4>
                    )}
                  </label>
                ))}
              </form>
            )}
            <select
              className="select-status"
              name="status"
              onChange={updateNewData}
            >
              {status.map((task: any, index: number) => (
                <option key={index} value={task}>
                  {task}
                </option>
              ))}
            </select>
            <button onClick={GetupdateData}>update task</button>
          </div>
        </>
      )}
    </>
  );
}

export default Card;
