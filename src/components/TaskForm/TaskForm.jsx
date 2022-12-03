import AdditionalInputBlock from "../AdditionalInputBlock/AdditionalInputBlock";
import MainInputBlock from "../MainInputBlock/MainInputBlock";

const TaskForm = () => {
  return (
    <form className="form">
      <MainInputBlock />
      <AdditionalInputBlock />
    </form>
  );
};

export default TaskForm;