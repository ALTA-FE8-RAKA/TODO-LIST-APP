import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTodo from "./pages/Edittodo";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TodoList />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
