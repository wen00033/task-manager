import { useThemeToggle, useTheme, useGetTasksId } from "./Theme";
import { Sun, Moon, Star } from "lucide-react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

function Header() {
  const lightMode = useTheme();
  const toggle = useThemeToggle();
  const tasks = useGetTasksId();
  // severless function output Doc id and Doc title

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
