const TaskControls = () => {
  return (
    <div className="list__task-buttons-container">
      <button className="button">Edit</button>
      <button className="button">Delete</button>
      <button className="list__expand-button button" />
    </div>
  );
};

export default TaskControls;