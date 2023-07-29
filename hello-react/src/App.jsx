import TaskCard from "./TaskCard"
import "./index.css"
function App() {
  return (
    <>
    <h1 className="ml-20">Smarter tasks</h1>
    <p className="ml-20 mb-15">Project: Graduation Final Year project(my website)</p>
     <div className="style-header">
      <h1 className="font-serif pl-10">PENDING</h1>
      <TaskCard title="Build the website with static content" assigneeName="Gurmu Gessese" dueDate="12/08/2023"></TaskCard>
      <TaskCard title="Add Blog" assigneeName="Surafel Diriba" dueDate="03/11/2023"></TaskCard>
      <button className="TaskItem">+ New Task</button>
      </div>
     
     
      <div className="style-header">
        <h1 className="font-serif pl-20">DONE</h1>
      <TaskCard title="Submit Final versioin of wd301 project" assigneeName="Gurmu Gessese" completedAtDate="15/08/2023" ></TaskCard>
      <TaskCard title="Design the web" assigneeName="John Doe" completedAtDate="15/08/2023" ></TaskCard>
      </div>
    </>
  )
}

export default App
