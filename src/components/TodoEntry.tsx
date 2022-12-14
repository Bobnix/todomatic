import { FormEvent, ChangeEvent, useState } from 'react';

interface PropInterface {
	onSubmit: (name: string) => any;
};

export default function TodoEntry(props: PropInterface) {

	const [name, setName] = useState('');

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setName(e.target.value);
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if(name){
			props.onSubmit(name);
			setName("");
		}
	}
	  
	return(
		<form onSubmit={handleSubmit}>
			<h2 className="label-wrapper">
				<label htmlFor="new-todo-input" className="label__lg">
					What needs to be done?
				</label>
			</h2>
			<input
				type="text"
				id="new-todo-input"
				className="input input__lg"
				name="text"
				autoComplete="off"
				value={name}
				onChange={handleChange}
			/>
			<button type="submit" className="btn btn__primary btn__lg">
				Add
			</button>
		</form>
	)
}