/**
 * 
 * @param {Object} props 
 * @param {Boolean} props.isAdditionalInfoShown
 * @param {Function} props.setIsAdditionalInfoShown
 */
const TaskControls = ({ isAdditionalInfoShown, setIsAdditionalInfoShown }) => {
  const expandButtonActiveClass = isAdditionalInfoShown ? "list__expand-button--active" : "";

  const expandButtonClickHandler = () => {
    setIsAdditionalInfoShown(!isAdditionalInfoShown);
  };

  return (
    <div className="list__task-buttons-container">
      <button className="button">Edit</button>
      <button className="button">Delete</button>
      <button className={`list__expand-button button ${expandButtonActiveClass}`} onClick={expandButtonClickHandler} />
    </div>
  );
};

export default TaskControls;