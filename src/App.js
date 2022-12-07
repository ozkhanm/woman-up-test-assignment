import { useSelector } from "react-redux";

import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

const App = () => {
  const { editTaskId } = useSelector(state => state.taskReducer);

  return (
    <Container>
      <Header />
      { editTaskId === -1 ? <TaskForm /> : null}
      <TaskList />
    </Container>
  );
};

export default App;
