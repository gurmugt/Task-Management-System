import Task from "./Task";
import { TaskItem } from "./types";

interface Props {
  tasks: TaskItem[];
  deleteTask: (index: number) => void;
}

const TaskList = ({ tasks, deleteTask }: Props) => {
  const lists = (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <Task item={task} removeTask={() => deleteTask(index)} />
        </li>
      ))}
    </ul>
  );
  return <>{lists}</>;
};

export default TaskList;
