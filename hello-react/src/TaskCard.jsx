import './TaskCard.css';

function TaskCard(props) {
  let pending = null;
  let done = null;

  if (props.dueDate) {
    pending = <p>Due Date: {props.dueDate}</p>;
  }

  if (props.completedAtDate) {
    done = <p>Completed on: {props.completedAtDate}</p>;
  }

  return (
    <>
      <div className='TaskItem'>
        <h2 className='text-xl font-bold text-purple-800'>{props.title}</h2>
        <p className='text-blue-600'>Name: {props.assigneeName}</p>
        {pending}
        {done}
      </div>
    </>
  );
}

export default TaskCard;
