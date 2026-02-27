"use client";

import { useState, useEffect } from "react";

export default function App() {
  const [dateTime, setDateTime] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [category, setCategory] = useState("guardia");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tareasHospital");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tareasHospital", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!dateTime || !taskInput) return;

    const newTask = {
      id: Date.now(),
      dateTime,
      text: taskInput,
      category,
      status: "pendiente",
    };

     const updated = [...tasks, newTask].sort(
  (a, b) =>
    new Date(a.dateTime).getTime() -
    new Date(b.dateTime).getTime()
);

    setTasks(updated);
    setTaskInput("");
  };

  const toggleStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "pendiente" ? "realizada" : "pendiente" }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>Gestión de Tareas - Hospital</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="guardia">Guardia</option>
          <option value="comisiones">Comisiones</option>
        </select>
        <input
          type="text"
          placeholder="Detalle de tarea..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Agregar</button>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <strong>{new Date(task.dateTime).toLocaleString()}</strong>
          <p>{task.text}</p>
          <small>
            {task.category} - {task.status}
          </small>
          <br />
          <button onClick={() => toggleStatus(task.id)}>Cambiar estado</button>
          <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}npm run dev
Local: http://localhost:3000
cd tareas-hospital
tareas-hospital>
