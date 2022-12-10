import { useDispatch, useSelector } from "react-redux";

import { taskSlice } from "../../store/reducers/TaskSlice";
import { deleteTask } from "../../api";
import { urlToObject } from "../../utils";

/**
 * @param {Object} props 
 * @param {String} props.taskId
 * @param {Function} props.setFiles
 */
const TaskControls = ({ taskId, setFiles }) => {
  const dispatch = useDispatch();
  const { tasks, additionalInfoShowTaskId } = useSelector(state => state.taskReducer);
  const { setEditTaskId, removeTask, setAdditionalInfoShowTaskId, changeExistingTask } = taskSlice.actions;
  const expandButtonActiveClass = additionalInfoShowTaskId === taskId ? "list__expand-button--active" : "";

  const deleteButtonClickHandler = () => {
    deleteTask(taskId);
    dispatch(removeTask(taskId));
  };

  const expandButtonClickHandler = () => {
    if (taskId === additionalInfoShowTaskId) {
      dispatch(setAdditionalInfoShowTaskId(-1));
    } else {
      dispatch(setAdditionalInfoShowTaskId(taskId));
    }
  };

  const editButtonClickHandler = () => {
    dispatch(setEditTaskId(taskId));

    const task = { ...tasks.find(it => it.id === taskId) };
    const promises = [];

    if (taskId !== -1) {
      const attachments = [...task.attachments];

      attachments.forEach(it => {
        promises.push(urlToObject(it));
      });

      Promise.all(promises)
        .then(data => {
          const taskSlice = { ...task };

          taskSlice.attachments = data;
          setFiles(data);
        });

      dispatch(changeExistingTask(task));
    } else {
      dispatch(changeExistingTask(task));
    }
  };

  return (
    <div className="list__task-buttons-container">
      <button className="button" onClick={editButtonClickHandler}>Edit</button>
      <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
      <button className={`list__expand-button button ${expandButtonActiveClass}`} onClick={expandButtonClickHandler} />
    </div>
  );
};

export default TaskControls;
