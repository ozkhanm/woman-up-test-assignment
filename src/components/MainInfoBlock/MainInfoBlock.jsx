import TaskControls from "../TaskControls/TaskControls";

/**
 * 
 * @param {Object} props 
 * @param {String} props.id
 * @param {String} props.title
 */
const MainInfoBlock = ({ id, title }) => {
  return (
    <div className="list__task-controls-container">
      <input id={id} type="checkbox" className="visually-hidden" />
      <label htmlFor={id} className="list__item-label">{ title }</label>
      <TaskControls />
    </div>
  );
};

export default MainInfoBlock;