import { useState } from "react";
import Checkbox from "rc-checkbox";
import { useReadLocalStorage } from "usehooks-ts";
// import { doc, updateDoc, getDoc } from "firebase/firestore";
// import db from "../utils/data";

import "./card.css";
function Card({ data }: any & { title: string; task: [] }) {
  const [taskWindow, setTaskWindow] = useState(false);
  const [updateData, setUpdateData] = useState({} as any);
  const status = ["todo", "doing", "done"];
  const ID = useReadLocalStorage("docID");
  console.log(ID);

  const taskWindowHandler = function () {
    setTaskWindow(!taskWindow);
  };

  function updateNewData(e: any) {
    setUpdateData({
      ...updateData,
      status: e.target.value,
      subtask: data.subtask,
    });
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     const docRef = doc(db, "Task-Manager", ID);
  //     const docSnap = await getDoc(docRef);
  //     let data = docSnap.data();
  //     // data from firestore
  //     setUpdateData(data.taskList);
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   async function updateData() {
  //     const docRef = doc(db, "Task-Manager", ID);
  //     await updateDoc(docRef, {
  //       taskList: updateData,
  //     });
  //   }
  // }, []);

  return (
    <>
      <div onClick={taskWindowHandler} className="card">
        <h2>{data.title}</h2>
        <p>{` ${data.subtask.length} subtasks`}</p>
      </div>
      {taskWindow && (
        <>
          <div onClick={taskWindowHandler} className="popup-background"></div>
          <div className="popup">
            <h3>Task Name:{data.title.toUpperCase()}</h3>
            <p>
              Description: <br />
              {data.description}
            </p>
            <h3>subtasks</h3>
            <ul className="subtask-container">
              {data.subtask.map((task: any, index: number) => (
                <li className="subtask" key={index}>
                  <Checkbox data-store={task.subtask} />
                  {task.status ? (
                    <del>
                      <h4>{task.subtask}</h4>
                    </del>
                  ) : (
                    <h4>{task.subtask}</h4>
                  )}
                </li>
              ))}
            </ul>
            <select name="list" onChange={updateNewData}>
              {status.map((task: any, index: number) => (
                <option key={index} value={task}>
                  {task}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
}

export default Card;
