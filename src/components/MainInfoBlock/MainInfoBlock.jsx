import TaskControls from "../TaskControls/TaskControls";

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