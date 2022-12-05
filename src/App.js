import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

const App = () => {
  return (
    <Container>
      <Header />
      <TaskForm />
      <TaskList />
    </Container>
  );
};

export default App;
