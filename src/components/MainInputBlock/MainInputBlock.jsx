import { useDispatch, useSelector } from "react-redux";

import { taskSlice } from "../../store/reducers/TaskSlice";
import { TASK_FIELDS } from "../../constants";

/**
 * @typedef {{
 * title: String
 * description: String
 * endDate: Number
 * attachments: Array<String>
 * isFinished: Boolean
 * }} Task
 */

/**
 * @param {Object} props 
 * @param {Task} props.taskData
 * @param {String} props.id
 * @param {Function} props.inputChangeHandler
 */
const MainInputBlock = ({ taskData, inputChangeHandler }) => {
  const { title } = taskData;
  const { editTaskId } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();
  const { setEditTaskId } = taskSlice.actions;

  const cancelButtonClickHandler = () => {
    dispatch(setEditTaskId(-1));
  };

  return (
    <div className="form__main-input-container">
      <input
        className="form__title-input"
        type="text"
        placeholder="What to do..."
        value={title}
        onChange={e => inputChangeHandler(e, TASK_FIELDS.TITLE)}
        required
      />
      <button className="form__submit-button button" type="submit">Submit</button>
      { editTaskId !== -1 ? 
          <button className="form__submit-button button" onClick={cancelButtonClickHandler}>Cancel</button> : null
      }
    </div>
  );
};

export default MainInputBlock;