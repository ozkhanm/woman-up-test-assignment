import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import TaskForm from "./components/TaskForm/TaskForm";

import { db } from "./firebase-config";
import TaskList from "./components/TaskList/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const dataCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const getData = async dataRef => {
      const data = await getDocs(dataRef);
      const parsedData = data.docs.map(it => ({ ...it.data(), id: it.id }));
      
      setTasks(parsedData);
    };

    getData(dataCollectionRef);
  }, []);

  return (
    <Container>
      <Header />
      <TaskForm />
      <TaskList tasks={tasks} />
    </Container>
  );
};

export default App;
