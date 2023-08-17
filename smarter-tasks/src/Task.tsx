import { TaskItem } from "./types";
interface Props extends TaskItem {
  onDelete: () => void;
}

const Task = ({ title, description, dueDate, onDelete }: Props) => {
  return (
    <div className="TaskItem shadow-md border border-slate-100">
      <h2 className="text-base font-bold my-1">{title}</h2>
      <p className="text-sm text-slate-500">Due Date: {dueDate}</p>
      <p className="text-sm text-slate-500">Description: {description}</p>
      <button
        className="deleteTaskButton bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
