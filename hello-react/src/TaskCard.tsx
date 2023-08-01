import React from 'react';
import './TaskCard.css';

interface TaskCardProps {
  title: string;
  assigneeName: string;
  dueDate?: string; 
  completedAtDate?: string;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
  let pending = null;
  let done = null;

  if (props.dueDate) {
    pending = <p>Due On: {props.dueDate}</p>;
  }

  if (props.completedAtDate) {
    done = <p>Completed on: {props.completedAtDate}</p>;
  }

  return (
    <div className='TaskItem'>
      <h2 className='text-xl font-bold text-purple-800'>{props.title}</h2>
      <p className='text-blue-600'>Assignee: {props.assigneeName}</p>
      {pending}
      {done}
    </div>
  );
}

export default TaskCard;
