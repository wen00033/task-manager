import AddTask from "../../Components/AddTask";
import { useState, useEffect } from "react";
import "./platform.css";
// import TaskCat from "../../Components/TaskCat";

const check = localStorage.getItem("docID") || "";
console.log(check);
function Platform() {
  const [tasks, setTasks] = useState({} as any);
  const [id, setId] = useState("");
  // const [cate, setCate] = useState([] as any);

  useEffect(() => {
    function watchId() {
      const id = JSON.parse(localStorage.getItem("docID") || "");
      console.log(id);
    }
    watchId();
  }, [check]);

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
        setTasks(data);
      } catch (e) {
        return;
      }
    }
    fetchData();
  }, []);
  console.log(tasks);
  return (
    <section className="platform ">
      <AddTask />
      <div className="platform-wrapper">
        {/* fetch function render empty object, use ternary to skip the empty object */}
        {/* {tasks.length > 0
          ? tasks.map((task: [], index: number) => (
              <TaskCat cate={cate} data={task} key={index} />
            ))
          : "loading"} */}
      </div>
    </section>
  );
}

export default Platform;
