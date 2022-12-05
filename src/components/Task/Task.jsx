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
const Task = ({task: { id, title, description, endDate, attachments, isFinished }}) => {
  const { editTaskId } = useSelector(state => state.taskReducer);
  const listItemEditClassname = id === editTaskId ? "list__item--edit" : "";

  return (
    <li key={id} className={`list__item ${listItemEditClassname}`}>
      {
        id !== editTaskId ?
        <>
          <MainInfoBlock 
            id={id}
            title={title}
            description={description}
            endDate={endDate}
            attachments={attachments}
            isFinished={isFinished}
          />
          <AdditionalInfoBlock
            id={id}
            description={description}
            endDate={endDate}
            attachments={attachments}
          />
        </>
        :
        <TaskForm
          title={title}
          id={id}
          description={description}
          endDate={endDate}
          attachments={attachments}
          isFinished={isFinished}
        />
      }
    </li>
  );
};

export default Task;