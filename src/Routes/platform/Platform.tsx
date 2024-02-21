import { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore/lite";
// import db from "../../utils/data";
import "./platform.css";
import TaskCat from "../../Components/TaskCat";
// get data from firebase
function Platform() {
  const [tasks, setTasks] = useState({} as any);
  const [cate, setCate] = useState([] as any);
  //reorder content to array
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "http://localhost:8888/.netlify/functions/getTask"
        );
        const data = await res.json();
        setTasks(Object.entries(data));
        setCate(Object.keys(data));
      } catch (e) {
        return;
      }
    }
    fetchData();
  }, []);

  return (
    <section className="platform ">
      <header>
        <h2 className="platform-title">tasks launch</h2>
        <button>Add task</button>
      </header>
      <div className="platform-wrapper">
        {/* fetch function render empty object, use ternary to skip the empty object */}
        {tasks.length > 0
          ? tasks.map((task: [], index: number) => (
              <TaskCat cate={cate} data={task} key={index} />
            ))
          : "loading"}
      </div>
    </section>
  );
}

export default Platform;
