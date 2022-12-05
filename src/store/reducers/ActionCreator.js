import { taskSlice } from "./TaskSlice";
import { dataCollectionRef, getTasks, updateTask, addTask } from "../../api";
import { ERROR_MESSAGES } from "../../constants";

/**
 * @typedef {{
 * title: String
 * description: String
 * endDate: Number
 * attachments: Array<String>
 * isFinished: Boolean
 * }} Task
 */

const { tasksLoading, tasksLoadingSuccess, toggleIsFinishedTaskStatus, setErrorMessage, clearInput, addNewTask } = taskSlice.actions;

export const fetchTasks = () => 
/**
 * @param {Function} dispatch 
 */
async dispatch => {
  try {
    dispatch(tasksLoading());

    const tasks = await getTasks(dataCollectionRef);

    dispatch(tasksLoadingSuccess(tasks));
  } catch (err) {
    dispatch(setErrorMessage(ERROR_MESSAGES.TASKS_FETCH_FAIL));
  }
};

/**
 * Changes task finish status
 * @param {String} id 
 * @param {Task} data 
 */
export const changeIsFinishedTaskStatus = (id, data) => 
/**
 * @param {Function} dispatch
 */ 
dispatch => {
  try {
    updateTask(id, data);
    dispatch(toggleIsFinishedTaskStatus(id));
  } catch (err) {
    dispatch(setErrorMessage(ERROR_MESSAGES.TASK_FINISH_STATUS_FAIL));
  }
};

/**
 * Adds new task
 * @param {Task} taskData 
 */
export const processAddNewTask = taskData => 
/**
 * @param {Function} dispatch 
 */
async dispatch => {
  try {
    const newTaskId = await addTask(taskData);

    dispatch(addNewTask({taskData, id: newTaskId}));
    dispatch(clearInput());
  } catch (err) {
    dispatch(setErrorMessage(ERROR_MESSAGES.NEW_TASK_ADD_FAIL));
  }
};
