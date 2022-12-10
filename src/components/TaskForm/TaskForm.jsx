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
import { getRandomId, urlToObject } from "../../utils";

/**
 * @param {Object} props 
 * @param {File[]} props.files
 * @param {Function} props.setFiles
 */
const TaskForm = ({ files, setFiles }) => {
  const dispatch = useDispatch();
  const { newTask, editingTask, editTaskId } = useSelector(state => state.taskReducer);
  const { editExistingTask, setEditTaskId, changeNewTask, changeExistingTask, clearExistingTask } = taskSlice.actions;

  const [taskData, setTaskData] = useState(() => editTaskId !== -1 ? editingTask : newTask);
  const [localUrls, setLocalUrls] = useState(() => editTaskId === -1 ? taskData.attachments.map(it => it.url) : taskData.attachments);
  const [isDataFetching, setIsDataFetching] = useState(false);

  const formSubmitButtonClickHandler = e => {
    e.preventDefault();

    setIsDataFetching(true);

    const taskDataSlice = { ...taskData };
    const urlsPromises = [];
    const data = editTaskId === -1 ? taskData.attachments : files;
    const refs = [];

    if (editTaskId !== -1) {
      Array.from(data).forEach(it => {
        refs.push({
          ref: ref(storage, `${it.name}-${getRandomId()}`),
          upload: it,
          url: URL.createObjectURL(it),
        });
      });
    }

    const editRefs = editTaskId === - 1 ? taskData.attachments : refs;

    for (let i = 0; i < editRefs.length; i++) {
      urlsPromises.push(uploadBytes(editRefs[i].ref, editRefs[i].upload));
    }

    Promise.all(urlsPromises)
      .then(data => {
        const links = [];

        for (let i = 0; i < data.length; i++) {
          links.push(getDownloadURL(data[i].ref));
        }

        Promise.all(links)
          .then(data => {
            taskDataSlice.attachments = data;
          })
          .then(() => {
            if (editTaskId === -1) {
              dispatch(processAddNewTask(taskDataSlice));
              setTaskData({
                title: "",
                description: "",
                endDate: Date.now(),
                attachments: [],
                isFinished: false,
              });
            } else {
              updateTask(editTaskId, taskDataSlice);
              dispatch(editExistingTask({ id: editTaskId, taskData: taskDataSlice }));
              dispatch(setEditTaskId(-1));
              dispatch(clearExistingTask());
            }

            setLocalUrls([]);
          })
          .then(() => {
            setIsDataFetching(false);
          });
      });
  };

  /**
   * Input handlers controller
   * @param {Function} action store action
   * @param {String} field field type
   * @param {String | File[]} value input value
   */
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
        const data = editTaskId === -1 ? value : files;
        
        Array.from(data).forEach(it => {
          attachmentRefs.push({
            ref: ref(storage, `${it.name}-${getRandomId()}`),
            upload: it,
            url: URL.createObjectURL(it),
          });
        });

        dispatch(action({...taskData, ...{
          [field]: [...attachmentRefs],
        }}));

        setTaskData({...taskData, ...{
          [field]: [...attachmentRefs],
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
      setFiles(value);
    }

    if (editTaskId === -1) {
      inputChangeController(changeNewTask, field, value);
    } else {
      inputChangeController(changeExistingTask, field, value);
    }
  };

  const removeImageButtonClickHandler = id => {
    if (editTaskId !== -1) {
      Promise.resolve()
        .then(() => {
          const data = { ...taskData };
          const attachments = [...data.attachments];
          const result = [];

          attachments.splice(id, 1);
          attachments.forEach(it => {
            result.push(urlToObject(it));
          });

          Promise.all(result)
            .then(data => {
              setFiles(data);
            })
            .then(() => {
              setLocalUrls(prevState => {
                const oldUrls = prevState.slice();
          
                oldUrls.splice(id, 1);
                
                return oldUrls;
              });
            });
          });
    } else {
      Promise.resolve()
        .then(() => {
          setLocalUrls(prevState => {
            const oldUrls = prevState.slice();
      
            oldUrls.splice(id, 1);
            
            return oldUrls;
          });
        })
        .then(() => {
          const data = { ...taskData };
          const attachments = [...data.attachments];

          attachments.splice(id, 1);
          data.attachments = attachments;
          setTaskData(data);

          return data;
        })
        .then(data => {
          const attachments = editTaskId === -1 ? data.attachments.map(it => it.upload) : [...data.attachments];

          inputChangeController(changeExistingTask, TASK_FIELDS.ATTACHMENTS, attachments);
        });
    }
  };

  return (
    <form className="form" onSubmit={formSubmitButtonClickHandler}>
      { isDataFetching ? <p className="message">Data fetching</p> : null }
      <MainInputBlock taskData={taskData} isDataFetching={isDataFetching} inputChangeHandler={inputChangeHandler} />
      <AdditionalInputBlock
        taskData={taskData}
        localUrls={localUrls}
        files={files}
        inputChangeHandler={inputChangeHandler}
        removeImageButtonClickHandler={removeImageButtonClickHandler}
      />
    </form>
  );
};

export default TaskForm;

