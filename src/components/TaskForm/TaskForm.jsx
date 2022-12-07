import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";

import AdditionalInputBlock from "../AdditionalInputBlock/AdditionalInputBlock";
import MainInputBlock from "../MainInputBlock/MainInputBlock";

import { updateTask } from "../../api";
import { processAddNewTask } from "../../store/reducers/ActionCreator";
import { taskSlice } from "../../store/reducers/TaskSlice";
import { TASK_FIELDS } from "../../constants";
import { storage } from "../../firebase-config";
import { getRandomId } from "../../utils";

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

  const [taskData, setTaskData] = useState(() => {
    return editTaskId !== -1 ? editingTask : newTask;
  });

  const [localUrls, setLocalUrls] = useState(() => {
    return taskData.attachments.map(it => it.url);
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
        const attachmentRefs = [];
        
        Array.from(value).forEach(it => {
          attachmentRefs.push({
            ref: ref(storage, `${it.name}-${getRandomId()}`),
            upload: it,
            url: URL.createObjectURL(it),
          });
        });

        dispatch(action({...taskData, ...{
          [field]: [...taskData[field], ...attachmentRefs],
        }}));

        setTaskData({...taskData, ...{
          [field]: [...taskData[field], ...attachmentRefs],
        }});
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
    const value = field !== TASK_FIELDS.ATTACHMENTS ? e.target.value : e.target.files;

    if (field === TASK_FIELDS.ATTACHMENTS) {
      const localUrls = Array.from(value).map(it => URL.createObjectURL(it));

      setLocalUrls(localUrls);
    }

    if (editTaskId === -1) {
      inputChangeController(changeNewTask, field, value);
    } else {
      inputChangeController(changeExistingTask, field, value);
    }
  };

  return (
    <form className="form" onSubmit={formSubmitButtonClickHandler}>
      <MainInputBlock taskData={taskData} inputChangeHandler={inputChangeHandler} />
      <AdditionalInputBlock taskData={taskData} inputChangeHandler={inputChangeHandler} localUrls={localUrls} />
    </form>
  );
};

export default TaskForm;