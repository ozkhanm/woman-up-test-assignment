import { useState } from "react";
import { useSelector } from "react-redux";

import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

const App = () => {
  const { editTaskId } = useSelector(state => state.taskReducer);
  const [files, setFiles] = useState([]);

  return (
    <Container>
      <Header />
      { editTaskId === -1 ? <TaskForm files={files} setFiles={setFiles} /> : null}
      <TaskList files={files} setFiles={setFiles} />
    </Container>
  );
};

export default App;
