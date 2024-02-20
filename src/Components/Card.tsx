import { useState } from "react";
import Checkbox from "rc-checkbox";
import "./card.css";
function Card({ data, cate }: any & { title: string; task: [] }) {
  const [taskWindow, setTaskWindow] = useState(false);
  const taskWindowHandler = function () {
    setTaskWindow(!taskWindow);
  };

  // console.log(data.task[0].subtask);
  return (
    <>
      <div onClick={taskWindowHandler} className="card">
        <h2>{data.title}</h2>
        <p>{` ${data.task[0].subtask.length} subtasks`}</p>
      </div>
      {taskWindow && (
        <>
          <div onClick={taskWindowHandler} className="popup-background"></div>
          <div className="popup">
            <h3>The quest title</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              quibusdam iusto officia dolorem. Quidem, velit ipsa blanditiis
              natus, quos repellat officiis amet perspiciatis aut temporibus
              aspernatur facilis minima! Nostrum, voluptates!
            </p>
            <h3>subtasks</h3>
            <ul className="subtask-container">
              {data.task[0].subtask.map((task: any, index: number) => (
                <li className="subtask" key={index}>
                  <Checkbox checked={true} />
                  <h4>{task}</h4>
                </li>
              ))}
            </ul>
            <select name="list">
              {cate.map((task: any, index: number) => (
                <option key={index} value={task}>
                  {task}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
}

export default Card;
