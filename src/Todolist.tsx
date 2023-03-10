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
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState("");

  const addTask = () => {
    props.addTask(title);
    setTitle("");
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  // const onAllClickHandler = () => props.changeFilter("all");
  // const onActiveClickHandler = () => props.changeFilter("active");
  // const onCompletedClickHandler = () => props.changeFilter("completed");
  const tsarChangeFilter = (valueFilter: FilterValuesType) => {
    props.changeFilter(valueFilter);
  };
  const onClickHandler = (taskId: string) => props.removeTask(taskId);
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={() => onClickHandler(t.id)}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => tsarChangeFilter("all")}>All</button>
        <button onClick={() => tsarChangeFilter("active")}>Active</button>
        <button onClick={() => tsarChangeFilter("completed")}>Completed</button>
      </div>
    </div>
  );
}
