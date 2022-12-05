import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Task from "../Task/Task";

import { fetchTasks } from "../../store/reducers/ActionCreator";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.taskReducer);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <ul className="list">
      { tasks.map(task => <Task key={task.id} task={task} />) }
    </ul>
  );
};

export default TaskList;