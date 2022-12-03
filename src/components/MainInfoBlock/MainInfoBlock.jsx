import TaskControls from "../TaskControls/TaskControls";

/**
 * 
 * @param {Object} props 
 * @param {String} props.id
 * @param {String} props.title
 * @param {Boolean} props.isAdditionalInfoShown
 * @param {Function} props.setIsAdditionalInfoShown
 */
const MainInfoBlock = ({ id, title, isAdditionalInfoShown, setIsAdditionalInfoShown }) => {
  return (
    <div className="list__task-controls-container">
      <input id={id} type="checkbox" className="visually-hidden" />
      <label htmlFor={id} className="list__item-label">{ title }</label>
      <TaskControls isAdditionalInfoShown={isAdditionalInfoShown} setIsAdditionalInfoShown={setIsAdditionalInfoShown} />
    </div>
  );
};

export default MainInfoBlock;