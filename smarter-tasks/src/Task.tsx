import "./TaskCard.css";
import { TaskItem } from "./types";

interface TaskProps {
  item: TaskItem;
  removeTask: (task: TaskItem) => void;
}
const Task = (props: TaskProps) => {
  const { item, removeTask } = props;
  console.log("This is the id passed from url",item.id);
  return (
    <div className="TaskItem shadow-md border border-slate-100">
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div>
          <a href={`/tasks/${item.id || ""}`}>
            <h2 className="text-base font-bold my-1">{item.title}</h2>
          </a>
          <p className="text-sm text-slate-500">Due Date: {item.dueDate}</p>
          <p className="text-sm text-slate-500">
            Description: {item.description}
          </p>
        </div>
        <button
        className="deleteTaskButton bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={()=> removeTask(item)}>
        Delete
      </button>
      </div>
    </div>
  );
};

export default Task;