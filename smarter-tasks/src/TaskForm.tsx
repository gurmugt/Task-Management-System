import React from "react";
import { TaskItem } from "./types";

interface TaskFormProps {
    addTask: (task: TaskItem) => void;
}

interface TaskFormState {
    title: string;
    description: string;
    dueDate: string;
}

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
    constructor(props: TaskFormProps) {
        super(props);
        this.state = {
            title: "",
            description: "",
            dueDate: "",
        };
    }

    addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        // Check if both title and due date are not empty before adding the task
        if (this.state.title.trim() !== "" && this.state.dueDate.trim() !== "") {
            const newTask = {
                title: this.state.title,
                description: this.state.description,
                dueDate: this.state.dueDate,
            };
            this.props.addTask(newTask);
            this.setState({ title: "", description: "", dueDate: "" });
        }
    };

    titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ title: event.target.value });
    };

    descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ description: event.target.value });
    };

    dueDateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({ dueDate: event.target.value });
    };

    render() {
      return (
          <form onSubmit={this.addTask}>
            
              <div>
                  <label htmlFor="todoTitle" className="font-bold">Task</label>
                  <br />
                  <input type="text" id="todoTitle" className="mb-5 w-full border rounded-md
                   px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Task" value={this.state.title} onChange={this.titleChanged}/>
              </div>

              <div>
                  <label htmlFor="todoDueDate" className="font-bold">Due Date</label>
                  <br />
                  <input type="text" id="todoDueDate"  className="mb-5 w-full border rounded-md
                   px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Due Date" value={this.state.dueDate} onChange={this.dueDateChanged} />
              </div>

              <div>
                  <label htmlFor="todoDescription" className="font-bold">Description</label>
                  <br />
                  <input type="text" id="todoDescription"  className="w-full border rounded-md 
                  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Description" value={this.state.description} onChange={this.descriptionChanged} />
              </div>

               <button type="submit" id="addTaskButton" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add item
                </button>
          </form>
      );
  }  
}

export default TaskForm;
