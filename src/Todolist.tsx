import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import s from "./Todolist.module.css";

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
  const [title, setTitle] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [buttonName, setButtonName] = useState<FilterValuesType>("all");

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
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
    setButtonName(valueFilter);
  };
  const removeTaskHandler = (taskId: string) => props.removeTask(taskId);
  const onChangeBoxHandler = (
    taskId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    props.changeBoxStatus(taskId, e.currentTarget.checked);
  };
  // const mappedTasks = props.tasks.map((t) => {
  //   return (
  //     <li >
  //       <input
  //         type="checkbox"
  //         checked={t.isDone}
  //         onChange={(e: ChangeEvent<HTMLInputElement>) =>
  //           onChangeBoxHandler(t.id, e)
  //         }
  //       />
  //       <span>{t.title}</span>
  //       <button onClick={() => removeTaskHandler(t.id)}>x</button>
  //     </li>
  //   );
  // });
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          className={error ? s.error : ""}
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={s.errorMessage}>{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          return (
            <li key={t.id} className={t.isDone ? s.isDone : ""}>
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
        })}
      </ul>
      <div>
        <button
          className={buttonName === "all" ? s.activeFilter : ""}
          onClick={() => tsarChangeFilter("all")}
        >
          All
        </button>
        <button
          className={buttonName === "active" ? s.activeFilter : ""}
          onClick={() => tsarChangeFilter("active")}
        >
          Active
        </button>
        <button
          className={buttonName === "completed" ? s.activeFilter : ""}
          onClick={() => tsarChangeFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
