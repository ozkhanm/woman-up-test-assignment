import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  isLoading: false,
  newTask: {
    title: "",
    description: "",
    endDate: Date.now(),
    attachments: [],
    isFinished: false,
  },
  editingTask: {},
  editTaskId: -1,
  additionalInfoShowTaskId: -1,
  error: "",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    /**
     * Changes tasks loading status
     */
    tasksLoading(state) {
      state.isLoading = true;
    },
    /**
     * Sets error message
     * @param {Object} action
     * @param {String} action.payload - error message
     */
    setErrorMessage(state, action) {
      state.error = action.payload;
    },
    /**
     * Adds tasks to store
     * @param {Object} action
     * @param {Task[]} action.payload - tasks
     */
    tasksLoadingSuccess(state, action) {
      state.tasks = action.payload;
      state.isLoading = false;
    },
    /**
     * Sets edit task id
     * @param {Object} action
     * @param {String} action.payload - edit task id
     */
    setEditTaskId(state, action) {
      state.editTaskId = action.payload;
    },
    /**
     * Sets additional info 
     * @param {Object} action
     * @param {String} action.payload - id of a task to show additional info
     */
    setAdditionalInfoShowTaskId(state, action) {
      state.additionalInfoShowTaskId = action.payload;
    },
    /**
     * Changes task finish status
     * @param {Object} action
     * @param {String} action.payload - task id
     */
    toggleIsFinishedTaskStatus(state, action) {
      const taskId = action.payload;
      const task = state.tasks.find(it => it.id === taskId);

      task.isFinished = !task.isFinished;
    },
    /**
     * Removes task from store
     * @param {Object} action
     * @param {String} action.payload - task id
     */
    removeTask(state, action) {
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex(it => it.id === taskId);
      const tasksSlice = state.tasks.slice();

      tasksSlice.splice(taskIndex, 1);
      state.tasks = tasksSlice;
    },
    /**
     * Adds task to store
     * @param {Object} action
     * @param {Task} action.payload.taskData - task data
     * @param {String} action.payload.id - task id
     */
    addNewTask(state, action) {
      const { taskData, id } = action.payload;
      const newTask = { ...taskData};

      newTask.id = id;
      state.tasks = [...state.tasks, newTask];
    },
    /**
     * Edits existing task
     * @param {Object} action
     * @param {Object} action.payload
     * @param {String} action.payload.id - id of a task to edit
     * @param {Task} action.payload.taskData - task data
     */
    editExistingTask(state, action) {
      const { id, taskData } = action.payload;
      const taskIndex = state.tasks.findIndex(it => it.id === id);
      
      state.tasks[taskIndex] = taskData;
      state.tasks[taskIndex].id = id;
    },
    /**
     * Clears new task form input
     */
    clearInput(state) {
      state.newTask = {
        title: "",
        description: "",
        endDate: Date.now(),
        attachments: [],
        isFinished: false,
      };
    },
    /**
     * Changes new task input data
     * @param {Object} action 
     * @param {Task} action.payload
     */
    changeNewTask(state, action) {
      state.newTask = action.payload;
    },
    /**
     * Changes editing task input data
     * @param {Object} action 
     * @param {Task} action.payload
     */
    changeExistingTask(state, action) {
      state.editingTask = action.payload;
    },
    /**
     * Clears existing task data
     */
    clearExistingTask(state) {
      state.editingTask = {};
    },
  },
});

export default taskSlice.reducer;
