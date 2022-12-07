import { useSelector } from "react-redux";

import MainInfoBlock from "../MainInfoBlock/MainInfoBlock";
import AdditionalInfoBlock from "../AdditionalInfoBlock/AdditionalInfoBlock";
import TaskForm from "../TaskForm/TaskForm";

/**
 * 
 * @param {Object} props 
 * @param {{
 *  id: String
 *  title: String
 *  description: String
 *  endDate: Number
 *  attachments: Array<String>
 *  isFinished: Boolean
 * }} props.task
 */
const Task = ({ task }) => {
  const { editTaskId } = useSelector(state => state.taskReducer);
  const listItemEditClassname = editTaskId === task.id ? "list__item--edit" : "";

  return (
    <li key={task.id} className={`list__item ${listItemEditClassname}`}>
      {
        editTaskId !== task.id ?
        <>
          <MainInfoBlock task={task} />
          <AdditionalInfoBlock task={task} />
        </>
        :
        <TaskForm task={task} />
      }
    </li>
  );
};

export default Task;
// prob here state
  /*
  Работа с новой таской
  1) Обновляем newTask в сторе
  2) При выборе прикрепляемых файлов отображаем их в списке (localUrl храним в стейте)
  3) В сторе нужно хранить ref, upload, globalUrl

  Работа с уже существующей таской
  1) Обновляем editingTask
  2)
  */