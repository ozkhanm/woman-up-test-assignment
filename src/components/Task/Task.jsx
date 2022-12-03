import MainInfoBlock from "../MainInfoBlock/MainInfoBlock";
import AdditionalInfoBlock from "../AdditionalInfoBlock/AdditionalInfoBlock";

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
 * }
 * attachments: Array<String>
 * }} props.task
 */
const Task = ({task: { id, title, description, endDate, attachments }}) => {
  return (
    <li key={id} className="list__item">
      <MainInfoBlock id={id} title={title} />
      <AdditionalInfoBlock id={id} description={description} endDate={endDate} attachments={attachments} />
    </li>
  );
};

export default Task;