import AddTask from "../../Components/AddTask";
import { useState, useEffect } from "react";
import "./platform.css";
import TaskCat from "../../Components/TaskCat";

const check = JSON.parse(localStorage.getItem("docID") || "");

function Platform() {
  const [tasks, setTasks] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "http://localhost:8888/.netlify/functions/getTask",
          {
            method: "POST",
            body: JSON.stringify({ docID: check }),
          }
        );
        const data = await res.json();
        // setTasks(Object.values(data));
        setTasks(Object.entries(data));
      } catch (e) {
        return;
      }
    }
    fetchData();
  }, []);

  return (
    <section className="platform ">
      <AddTask />
      <div className="platform-wrapper">
        {/* fetch function render empty object, use ternary to skip the empty object */}
        {tasks.length > 0
          ? tasks.map((task: [], index: number) => (
              <TaskCat data={task} key={index} />
            ))
          : "loading"}
      </div>
    </section>
  );
}

export default Platform;
