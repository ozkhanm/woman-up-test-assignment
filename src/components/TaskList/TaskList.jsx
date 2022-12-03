import Task from "../Task/Task";

const TaskList = ({ tasks }) => {
  return (
    <ul className="list">
      { tasks.map(task => <Task key={task.id} task={task} />) }
    </ul>
  );
};

export default TaskList;