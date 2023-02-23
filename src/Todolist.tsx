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
  changeBoxStatus: (taskId: string, newIsDone: boolean) => void;
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState("");

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title);
      setTitle("");
    }
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
  const removeTaskHandler = (taskId: string) => props.removeTask(taskId);

  const onChangeBoxHandler = (
    taskId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    props.changeBoxStatus(taskId, e.currentTarget.checked);
  };
  const mappedTasks = props.tasks.map((t) => {
    return (
      <li key={t.id}>
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeBoxHandler(t.id, e)
          }
        />
        <span>{t.title}</span>
        <button onClick={() => removeTaskHandler(t.id)}>x</button>
      </li>
    );
  });
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
      <ul>{mappedTasks}</ul>
      <div>
        <button onClick={() => tsarChangeFilter("all")}>All</button>
        <button onClick={() => tsarChangeFilter("active")}>Active</button>
        <button onClick={() => tsarChangeFilter("completed")}>Completed</button>
      </div>
    </div>
  );
}
