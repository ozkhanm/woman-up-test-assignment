import { useRef } from "react";
import { useDispatch } from "react-redux";

import TaskControls from "../TaskControls/TaskControls";

import { changeIsFinishedTaskStatus } from "../../store/reducers/ActionCreator";

/**
 * @param {Object} props 
 * @param {String} props.id
 * @param {String} props.title
 * @param {String} props.description
 * @param {Number} props.endDate
 * @param {Array<String>} props.attachments
 * @param {Boolean} props.isFinished
 * @param {Function} props.setFiles
 */
const MainInfoBlock = ({task: { id, title, description, endDate, attachments, isFinished }, setFiles}) => {
  const dispatch = useDispatch();
  const checkboxRef = useRef();

  const checkboxChangeHandler = () => {
    const checkedStatus = checkboxRef.current.checked;
    
    dispatch(changeIsFinishedTaskStatus(id, {
      title,
      description,
      endDate,
      attachments,
      isFinished: checkedStatus,
    }));
  };

  const expiredTimeClass = Date.now() > endDate && !isFinished ? "list__item-label--expired" : "";

  return (
    <div className="list__task-controls-container">
      <input
        ref={checkboxRef}
        id={id}
        type="checkbox"
        className="visually-hidden"
        checked={isFinished}
        onChange={checkboxChangeHandler}
      />
      <label
        htmlFor={id}
        className={`list__item-label ${expiredTimeClass}`}
      >
        { title }
      </label>
      <TaskControls taskId={id} setFiles={setFiles} />
    </div>
  );
};

export default MainInfoBlock;
