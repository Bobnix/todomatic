import { useState, useRef, useEffect } from 'react'
import { nanoid } from "nanoid";

import Todo from "./components/Todo";
import TodoEntry from "./components/TodoEntry";
import FilterButton from "./components/FilterButton";

import TodoItem from "./interfaces/TodoItem";

interface FunctionDictionary {
	[key: string]: (value: TodoItem) => boolean;
};

interface PropInterface {
	tasks: Array<TodoItem>;
};

const FILTER_MAP: FunctionDictionary = {
	All: () => true,
	Active: (task: TodoItem) => !task.completed,
	Completed: (task: TodoItem) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value: number): number {
	const ref = useRef<number>(0);
	useEffect(() => {
	  ref.current = value;
	});
	return ref.current;
}

function App(props:PropInterface) {

	const [tasks, setTasks] = useState(props.tasks);
	const [filter, setFilter] = useState('All');

	const listHeadingRef = useRef<HTMLHeadingElement>(null);

	function addTask(name: string) {
		const newTask: TodoItem = { id: "todo-" + nanoid(), name: name, completed: false };
		setTasks([...tasks, newTask]);
	}

	function toggleTaskCompleted(id: string) {
		const updatedTasks = tasks.map((task: TodoItem ) => {
			// if this task has the same ID as the edited task
			if (id === task.id) {
			// use object spread to make a new object
			// whose `completed` prop has been inverted
				return {...task, completed: !task.completed}
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function deleteTask(id: string) {
		const remainingTasks = tasks.filter((task: TodoItem) => id !== task.id);
		setTasks(remainingTasks);
	}
	

	function editTask(id: string, newName: string) {
		const editedTaskList = tasks.map((task: TodoItem) => {
		// if this task has the same ID as the edited task
		  if (id === task.id) {
			//
			return {...task, name: newName}
		  }
		  return task;
		});
		setTasks(editedTaskList);
	}

	  
	  

	const taskList = tasks.filter(FILTER_MAP[filter]).map((task: TodoItem) => (
		<Todo
			item={task}
			key={task.id}
			onToggle={toggleTaskCompleted}
			onDelete={deleteTask}
			onEdit={editTask}
		/>
	));

	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));
	  

	const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
	const headingText = `${taskList.length} ${tasksNoun} remaining`;

	const prevTaskLength: number = usePrevious(tasks.length);

	useEffect(() => {
		if (tasks.length - prevTaskLength === -1) {
		  listHeadingRef.current?.focus();
		}
	  }, [tasks.length, prevTaskLength]);
	  

	
	return (
		<div className="todoapp stack-large">
			<h1>TodoMatic</h1>
			<TodoEntry onSubmit={addTask} />
			<div className="filters btn-group stack-exception">
				{filterList}
			</div>
			<h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
				{headingText}
			</h2>
			<ul
				role="list"
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading"
			>
				{taskList}
			</ul>
		</div>
	);
}


export default App
