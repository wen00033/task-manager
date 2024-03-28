import "./card.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UpperSingleTask } from "./TaskManagerSlice";
function Card({ task }) {
  const dispatch = useDispatch();
  const categories = ["todo", "doing", "done"];
  const [taskWindow, setTaskWindow] = useState(false);
  const [updateTask, setUpdateTask] = useState({});
  const taskWindowHandler = function () {
    setTaskWindow(!taskWindow);
  };
  const updateTaskHandler = function (e) {
    setUpdateTask({ ...task, [e.target.name]: e.target.value });
  };

  const updateTaskToReduxHandler = function (e) {
    e.preventDefault();
    if (Object.values(updateTask).length > 0) {
      dispatch(UpperSingleTask(updateTask));
    }
  };

  return (
    <>
      <div onClick={taskWindowHandler} className="card">
        <h2>{task.title}</h2>
        <p>{`${task.subtask.length} subtask`}</p>
      </div>
      {taskWindow && (
        <>
          <div onClick={taskWindowHandler} className="popup-background"></div>
          <div className="popup">
            <h3>Task Name: {task.title}</h3>
            <p>Description:{task.description}</p>
            {task.subtask.length > 0 && (
              <form className="subtask-container">
                {task.subtask.map((task: any, index: number) => (
                  <>
                    <div data-id={task.subtask.id} className="single-subtask">
                      <input type="checkbox" name={task.subtask} />
                      <label key={index}>
                        {task.subtask.status ? (
                          <del>{task.subtask}</del>
                        ) : (
                          task.subtask
                        )}
                      </label>
                    </div>
                  </>
                ))}
              </form>
            )}
            <select
              className="select-status"
              name="status"
              onChange={updateTaskHandler}
            >
              {categories.map((status: any, index: number) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button onClick={updateTaskToReduxHandler}>update task</button>
          </div>
        </>
      )}
    </>
  );
}

export default Card;
