import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { AddNewTask, DeleteTask, CurrentTask } from "./TaskManagerSlice";
import { useState } from "react";
import { Star, ArchiveRestore } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Header({ animation }) {
  // eslint-disable-next-line
  const [parent, enableAnimation] = useAutoAnimate(true);
  const dispatch = useDispatch();
  // Add new task categories
  const [taskName, setTaskName] = useState({});
  //  ----------
  const ReduxTasksManager = useSelector(
    (state) => state.TaskManager.taskManager
  );
  const ReduxCurrentTask = useSelector(
    (state) => state.TaskManager.currentTask.id
  );

  const AddNewTaskHandler = function (e) {
    e.preventDefault();
    if (taskName.taskName === "") return;
    dispatch(AddNewTask(taskName));
    setTaskName({ taskName: "", id: "" });
  };
  const DeleteTaskHandler = function (e) {
    const id = e.target.dataset.delete;
    dispatch(DeleteTask(id));
  };

  const ArchiveTaskHandler = function (e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    dispatch(CurrentTask(id));
  };

  return (
    <header className={`container main-task-container ${animation}`}>
      <div className="main-task-container-wrapper">
        <>
          <h1>Task Master</h1>
          <li className="main-task">
            <Star className="task-icon" />
            <form onSubmit={AddNewTaskHandler}>
              <input
                value={taskName.taskName}
                onChange={(e) => {
                  setTaskName({
                    taskName: e.target.value,
                    id: crypto.randomUUID(),
                  });
                }}
                type="text"
              />
            </form>
            <ArchiveRestore />
          </li>
          <ul className="task-container" ref={parent}>
            {/* to ensure map, tasks always going to be an array for mapping */}
            {Array.isArray(ReduxTasksManager) &&
              ReduxTasksManager.map((task) => (
                <li
                  key={task.id}
                  className={`task-list ${
                    ReduxCurrentTask == task.id ? "focus" : ""
                  }`}
                >
                  <Star />
                  <h3
                    data-id={task.id}
                    onClick={ArchiveTaskHandler}
                    className="task-icon"
                  >
                    {task.taskName}
                  </h3>
                  <span
                    onClick={DeleteTaskHandler}
                    className="task-delete"
                    data-delete={task.id}
                  >
                    ❌
                  </span>
                </li>
              ))}
          </ul>
        </>
      </div>
    </header>
  );
}

export default Header;
