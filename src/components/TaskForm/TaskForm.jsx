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
const TaskForm = () => {
  const dispatch = useDispatch();
  const { newTask, editingTask, editTaskId } = useSelector(state => state.taskReducer);
  const { editExistingTask, setEditTaskId, changeNewTask, changeExistingTask, clearExistingTask } = taskSlice.actions;
  // const taskData = editTaskId !== -1 ? editingTask : newTask;

  const [taskData, setTaskData] = useState(() => {
    return editTaskId !== -1 ? editingTask : newTask;
  });

  /**
   * @param {SubmitEvent} e 
   */
  const formSubmitButtonClickHandler = e => {
    e.preventDefault();

    if (editTaskId === -1) {
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

    if (editTaskId === -1) {
      inputChangeController(changeNewTask, field, value);
    } else {
      inputChangeController(changeExistingTask, field, value);
    }
  };

  return (
    <form className="form" onSubmit={formSubmitButtonClickHandler}>
      <MainInputBlock taskData={taskData} inputChangeHandler={inputChangeHandler} />
      <AdditionalInputBlock taskData={taskData} inputChangeHandler={inputChangeHandler} />
    </form>
  );
};

export default TaskForm;