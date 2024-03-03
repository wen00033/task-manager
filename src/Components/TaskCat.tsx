import Card from "./Card";
function TaskCat({ data, refetch }: any & { string: [] }) {
  return (
    <div className="tasks-container">
      <h3 className="tasks-title">{data[0].toUpperCase()}</h3>
      {data[1].map((task: any, index: number) => (
        <Card refetch={refetch} taskList={task} key={index} />
      ))}
    </div>
  );
}

export default TaskCat;
