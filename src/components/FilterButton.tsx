interface PropInterface {
	name: string;
	isPressed: boolean;
	setFilter: (name: string) => any;
};

export default function FilterButton(props: PropInterface) {
	return(
		<button type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={() => props.setFilter(props.name)}>
			<span className="visually-hidden">Show </span>
			<span>{props.name}</span>
			<span className="visually-hidden"> tasks</span>
		</button>
	);
}