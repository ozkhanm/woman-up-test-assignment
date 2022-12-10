import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Task from "../Task/Task";

import { fetchTasks } from "../../store/reducers/ActionCreator";

/**
 * @param {Object} props 
 * @param {File[]} props.files
 * @param {Function} props.setFiles
 */
const TaskList = ({ files, setFiles }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.taskReducer);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <ul className="list">
      { tasks.map(task => <Task key={task.id} task={task} files={files} setFiles={setFiles} />) }
    </ul>
  );
};

export default TaskList;
