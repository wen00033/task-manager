import { collection, addDoc } from "firebase/firestore";
import db from "../utils/data.ts";
import { useThemeToggle, useTheme } from "./Theme";
import { Sun, Moon, Star } from "lucide-react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { useState, useEffect } from "react";

function Header() {
  const [submit, setSubmit] = useState(false);
  const [tasks, setTasks] = useState<[] | string>([]);
  const [title, setTitle] = useState("");
  const lightMode = useTheme();
  const toggle = useThemeToggle();
  // const tasks = useGetTasksId();
  async function getTasks() {
    const res = await fetch(
      "http://localhost:8888/.netlify/functions/getTasksManager"
    );
    const data = await res.json();
    setTasks(data);
  }
  useEffect(() => {
    getTasks();
  }, [submit]);

  async function addDocument(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title === "") return;
    const taskManager = await addDoc(collection(db, "Task-Manager"), {
      title: title,
    });
    console.log("Document added with ID:", taskManager);
    setTitle("");
    setSubmit(!submit);
  }
  console.log(submit);

  return (
    <header className="container main-task-container">
      <div>
        <h1>Task Master</h1>
        <ul className="task-container">
          {/* to ensure map, tasks always going to be an array for mapping */}
          {Array.isArray(tasks) &&
            tasks.map((task: { title: string; id: string }) => (
              <li key={task.id} className="main-task">
                <Star className="task-icon" />
                <h3>{task.title}</h3>
              </li>
            ))}
          <li className="main-task">
            <Star className="task-icon" />
            <form onSubmit={addDocument}>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
              />
            </form>
          </li>
        </ul>
      </div>

      <div className="toggle">
        <Moon />
        <Toggle defaultChecked={lightMode} icons={true} onChange={toggle} />
        <Sun />
      </div>
    </header>
  );
}

export default Header;
