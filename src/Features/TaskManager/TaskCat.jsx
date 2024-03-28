import Card from "./Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// import { useState } from "react";
function TaskCat({ data, categories }) {
  // eslint-disable-next-line
  const [parent, enableAnimation] = useAutoAnimate(true);
  // console.log(data);
  return (
    <ul className="tasks-container" ref={parent}>
      <h1>{categories.toUpperCase()}</h1>
      {data.task !== undefined
        ? data.task.map(
            (task, index) =>
              task.status == categories && <Card key={index} task={task} />
          )
        : "Add New Task"}
    </ul>
  );
}

export default TaskCat;
