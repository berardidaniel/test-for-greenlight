import { useState, useActionState } from "react";
import "./App.css";
import type { Task } from "./types";
import axios from "axios";

function App() {
  const [state, formAction, isPending] = useActionState(createTodo, null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  async function createTodo(_: unknown, formData: FormData) {
    const taskName = formData.get("taskName");
    const completed = formData.get("completed");

    try {
      await axios.post("/api/tasks", {
        name: taskName,
        completed: completed === "on",
      });
      setTasks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: taskName as string,
          completed: completed === "on",
        },
      ]);
    } catch (e) {
      console.error("Error creating todo", e);
    }
  }

  return (
    <>
      <form action={formAction}>
        <label htmlFor="taskName">Task Name</label>
        <input id="taskName" name="taskName" aria-required="true" required />
        <label htmlFor="completed">Completed</label>
        <input
          id="completed"
          name="completed"
          type="checkbox"
          aria-required="true"
          required
        />
        <input type="submit" disabled={isPending || submitDisabled} />
        {isPending && <p>Loading...</p>}
      </form>

      <ol>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} {task.completed ? "(Completed)" : "(Pending)"}
          </li>
        ))}
      </ol>
    </>
  );
}

export default App;
