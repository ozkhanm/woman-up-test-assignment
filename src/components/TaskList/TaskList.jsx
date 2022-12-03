import Task from "../Task/Task";

/**
 * 
 * @param {Object} props 
 * @param {Array<{
 * id: String
 * description: String
 * title: String
 * endDate: {
 * seconds: Number
 * nanoseconds: Number
 * }
 * attachments: Array<String>
 * isFinished: Boolean
 * }>} props.tasks
 */
const TaskList = ({ tasks }) => {
  return (
    <ul className="list">
      { tasks.map(task => <Task key={task.id} task={task} />) }
    </ul>
  );
};

export default TaskList;