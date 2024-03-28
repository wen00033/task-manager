import AddTask from "./AddTask";
import "./platform.css";
import TaskCat from "./TaskCat";
import { useSelector } from "react-redux";
function Platform() {
  const id = useSelector((state) => state.TaskManager.currentTask.id);
  const allTask = useSelector((state) => state.TaskManager.taskManager);
  const currentTask = allTask.find((task) => task.id === id);
  const categories = ["todo", "doing", "done"];
  return (
    <section className="platform ">
      <AddTask />
      <div className="platform-wrapper">
        {categories == undefined || currentTask == undefined
          ? ""
          : categories.map((categories, index) => (
              <TaskCat data={currentTask} categories={categories} key={index} />
            ))}
      </div>
    </section>
  );
}

export default Platform;
