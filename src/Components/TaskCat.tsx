import Card from "./Card";
function TaskCat({ data }: any & { string: [] }) {
  return (
    <div className="tasks-container">
      <h3 className="tasks-title">{data[0].toUpperCase()}</h3>
      {data[1].map((task: any, index: number) => (
        <Card data={task} taskList={data} key={index} />
      ))}
    </div>
  );
}

export default TaskCat;
