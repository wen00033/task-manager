import AddTask from "../../Components/AddTask";
import { useState, useEffect } from "react";
import "./platform.css";
import TaskCat from "../../Components/TaskCat";
import { useReadLocalStorage } from "usehooks-ts";

function Platform() {
  const [tasks, setTasks] = useState({} as any);
  const ID = useReadLocalStorage("docID");

  async function fetchData() {
    try {
      const res = await fetch(".netlify/functions/getTask", {
        method: "POST",
        body: JSON.stringify({ docID: ID }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      // setTasks(Object.values(data));
      setTasks(Object.entries(data));
    } catch (error) {
      return setTasks([]);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [ID]);

  return (
    <section className="platform ">
      <AddTask refetch={fetchData} />
      <div className="platform-wrapper">
        {/* fetch function render empty object, use ternary to skip the empty object */}
        {tasks.length > 0 ? (
          tasks.map((task: [], index: number) => (
            <TaskCat data={task} key={index} />
          ))
        ) : (
          <h2>Please add new task</h2>
        )}
      </div>
    </section>
  );
}

export default Platform;
