import "./header.css";
import { useMediaQuery } from "usehooks-ts";
import { useLocalStorage } from "usehooks-ts";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../../utils/data.ts";
import { useDispatch, useSelector } from "react-redux";
import "react-toggle/style.css";
import { useState, useEffect } from "react";
import { addDocument } from "./headerSlice.js";
import {
  Star,
  XOctagon,
  ChevronRight,
  ChevronLeft,
  ArchiveRestore,
} from "lucide-react";

function Header() {
  const dispatch = useDispatch();
  const [fold, setFold] = useState(false);
  const matches = useMediaQuery("(min-width: 800px)");
  // --------
  const [docID, setDocID] = useLocalStorage("docID", "0"); // [1
  const [title, setTitle] = useState("");
  const data = useSelector((state) => state.header.task);
  const [tasks, setTasks] = useState<[] | string>(data);
  const [submit, setSubmit] = useState(null);
  async function readDocument() {
    const res = await fetch(".netlify/functions/getTasksManager");
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    readDocument();
  }, [submit]);

  async function deleteDocument(id: string) {
    await deleteDoc(doc(db, "Task-Manager", id));
    setSubmit((el) => (el = !el));
  }

  function updatedDocument(e: Event) {
    e.preventDefault();
    if (title === "") return;
    dispatch(addDocument(title));
    setSubmit(!submit);
    setTitle("");
  }

  function toggleFold() {
    setFold(!fold);
  }

  return (
    <header
      className={`container main-task-container ${
        !matches && fold ? "main-task-container-fold" : ""
      }`}
    >
      {!matches &&
        (fold ? (
          <ChevronRight onClick={toggleFold} className="main-task-toggle" />
        ) : (
          <ChevronLeft onClick={toggleFold} className="main-task-toggle" />
        ))}

      <div className="main-task-container-wrapper">
        <>
          <h1>Task Master</h1>
          <ul className="task-container">
            {/* to ensure map, tasks always going to be an array for mapping */}
            {Array.isArray(tasks) &&
              tasks.map((task: { title: string; id: string }) => (
                <li
                  className={`main-task ${task.id === docID ? "active" : ""}`}
                  onClick={() => setDocID(task.id)}
                  key={task.id}
                >
                  <Star />
                  <h3 className="task-icon">{task.title}</h3>
                  <XOctagon
                    className="task-delete"
                    onClick={() => {
                      deleteDocument(task.id);
                    }}
                  />
                </li>
              ))}
            <li className="main-task">
              <Star className="task-icon" />
              <form onSubmit={updatedDocument}>
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                />
              </form>
              <ArchiveRestore />
            </li>
          </ul>
        </>
      </div>
      {/* <div className="toggle">
        <Moon />
        <Toggle defaultChecked={lightMode} icons={true} onChange={toggle} />
        <Sun />
      </div> */}
    </header>
  );
}

export default Header;
