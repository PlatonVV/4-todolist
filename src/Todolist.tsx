import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  };
  const multiChangeFilter = (valueFilter: FilterValuesType) => {
    props.changeFilter(valueFilter);
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = (taskId: string) => props.removeTask(taskId);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked);
          };
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeHandler}
              />
              <span>{t.title}</span>
              <button onClick={() => onClickHandler(t.id)}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={() => multiChangeFilter("all")}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={() => multiChangeFilter("active")}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={() => multiChangeFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
