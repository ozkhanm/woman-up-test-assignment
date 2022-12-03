import MainInfoBlock from "../MainInfoBlock/MainInfoBlock";
import AdditionalInfoBlock from "../AdditionalInfoBlock/AdditionalInfoBlock";
import { useState } from "react";

/**
 * 
 * @param {Object} props 
 * @param {{
 *  id: String
 *  title: String
 *  description: String
 *  endDate: {
 *    seconds: Number
 *    nanoseconds: Number
 *  }
 *  attachments: Array<String>
 *  isFinished: Boolean
 * }} props.task
 */
const Task = ({task: { id, title, description, endDate, attachments, isFinished }}) => {
  const [isAdditionalInfoShown, setIsAdditionalInfoShown] = useState(false);

  return (
    <li key={id} className="list__item">
      <MainInfoBlock id={id} title={title} isFinished={isFinished} isAdditionalInfoShown={isAdditionalInfoShown} setIsAdditionalInfoShown={setIsAdditionalInfoShown}/>
      <AdditionalInfoBlock id={id} description={description} endDate={endDate} attachments={attachments} isAdditionalInfoShown={isAdditionalInfoShown} />
    </li>
  );
};

export default Task;