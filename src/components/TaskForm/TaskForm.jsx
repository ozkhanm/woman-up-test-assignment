import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import AdditionalInputBlock from "../AdditionalInputBlock/AdditionalInputBlock";
import MainInputBlock from "../MainInputBlock/MainInputBlock";

import { updateTask } from "../../api";
import { processAddNewTask } from "../../store/reducers/ActionCreator";
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
 * 
 * @param {Object} props 
 * @param {String} props.title
 * @param {String} props.id
 * @param {String} props.description
 * @param {Number} props.endDate
 * @param {Array<String>} props.attachments
 * @param {Boolean} props.isFinished
 */
const TaskForm = ({ title, id, description, endDate, attachments, isFinished }) => {
  const dispatch = useDispatch();
  const { newTask, editTaskId } = useSelector(state => state.taskReducer);
  const { editExistingTask, setEditTaskId, changeNewTask, changeExistingTask, clearExistingTask } = taskSlice.actions;
  const [taskData, setTaskData] = useState(
    /**
     * Initialize task data
     * @returns {Task}
     */
    () => {
    return id === editTaskId ? {
      title,
      description,
      endDate,
      attachments,
      isFinished,
    } : newTask;
  });

  /**
   * @param {SubmitEvent} e 
   */
  const formSubmitButtonClickHandler = e => {
    e.preventDefault();

    if (id !== editTaskId) {
      dispatch(processAddNewTask(taskData));
      setTaskData({
        title: "",
        description: "",
        endDate: Date.now(),
        attachments: [],
        isFinished: false,
      });
    } else {
      updateTask(editTaskId, taskData);
      dispatch(editExistingTask({ id: editTaskId, taskData }));
      dispatch(setEditTaskId(-1));
      dispatch(clearExistingTask());
    }
  };

  const inputChangeController = (action, field, value) => {
    switch (field) {
      case TASK_FIELDS.END_DATE:
        dispatch(action({...taskData, ...{
          [field]: dayjs(value).valueOf(),
        }}));
        setTaskData({...taskData, ...{
          [field]: dayjs(value).valueOf(),
        }});
        break;

      case TASK_FIELDS.ATTACHMENTS:
        // TODO
        break;

      default:
        dispatch(action({...taskData, ...{
          [field]: value,
        }}));
        setTaskData({...taskData, ...{
          [field]: value,
        }});
    }
  };

  /**
   * @param {InputEvent} e 
   * @param {String} field 
   */
  const inputChangeHandler = (e, field) => {
    const value = e.target.value;

    if (id !== editTaskId) {
      inputChangeController(changeNewTask, field, value);
    } else {
      inputChangeController(changeExistingTask, field, value);
    }
  };

  return (
    <form className="form" onSubmit={formSubmitButtonClickHandler}>
      <MainInputBlock taskData={taskData} id={id} inputChangeHandler={inputChangeHandler} />
      <AdditionalInputBlock taskData={taskData} inputChangeHandler={inputChangeHandler} />
    </form>
  );
};

export default TaskForm;