import React, {useState, useRef, useEffect, ChangeEvent, FormEvent} from "react";

import TodoItem from "../interfaces/TodoItem";

interface PropInterface {
	item: TodoItem;
	onEdit: (id: string, name: string) => any;
	onToggle: (id: string) => any;
	onDelete: (id: string) => any;
};

function usePrevious<T>(value: T) {
	const ref = useRef<T>();
	useEffect(() => {
	  ref.current = value;
	});
	return ref.current;
}

export default function Todo(props: PropInterface) {
	  

	const [isEditing, setEditing] = useState(false);
	const [newName, setNewName] = useState('');

	const editFieldRef = useRef<HTMLInputElement>(null);
	const editButtonRef = useRef<HTMLButtonElement>(null);

	const wasEditing = usePrevious<boolean>(isEditing);

	const item = props.item;

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setNewName(e.target.value);
	}
	  
	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		props.onEdit(item.id, newName);
		setNewName("");
		setEditing(false);
	}

	useEffect(() => {
		if (!wasEditing && isEditing) {
		  editFieldRef.current?.focus();
		}
		if (wasEditing && !isEditing) {
		  editButtonRef.current?.focus();
		}
	  }, [wasEditing, isEditing]);
		  
		
	  

	const editingTemplate = (
		<form className="stack-small" onSubmit={handleSubmit}>
		  <div className="form-group">
			<label className="todo-label" htmlFor={item.id}>
			  New name for {item.name}
			</label>
			<input id={item.id} className="todo-text" type="text" value={newName} onChange={handleChange} ref={editFieldRef} />
		  </div>
		  <div className="btn-group">
			<button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
			  Cancel
			  <span className="visually-hidden">renaming {item.name}</span>
			</button>
			<button type="submit" className="btn btn__primary todo-edit">
			  Save
			  <span className="visually-hidden">new name for {item.name}</span>
			</button>
		  </div>
		</form>
	  );
	  const viewTemplate = (
		<div className="stack-small">
		  <div className="c-cb">
			  <input
				id={item.id}
				type="checkbox"
				defaultChecked={item.completed}
				onChange={() => props.onToggle(item.id)}
			  />
			  <label className="todo-label" htmlFor={item.id}>
				{item.name}
			  </label>
			</div>
			<div className="btn-group">
			  <button type="button" className="btn" onClick={() => setEditing(true)} ref={editButtonRef}>
				Edit <span className="visually-hidden">{item.name}</span>
			  </button>
			  <button
				type="button"
				className="btn btn__danger"
				onClick={() => props.onDelete(item.id)}
			  >
				Delete <span className="visually-hidden">{item.name}</span>
			  </button>
			</div>
		</div>
	  );
	  

	  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
  