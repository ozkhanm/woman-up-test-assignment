import { useDispatch, useSelector } from "react-redux";

import { taskSlice } from "../../store/reducers/TaskSlice";
import { deleteTask } from "../../api";

/**
 * 
 * @param {Object} props 
 * @param {String} props.taskId
 */
const TaskControls = ({ taskId }) => {
  const dispatch = useDispatch();
  const { additionalInfoShowTaskId } = useSelector(state => state.taskReducer);
  const { setEditTaskId, removeTask, setAdditionalInfoShowTaskId } = taskSlice.actions;
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