import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../redux/todoSlice";
import { nanoid } from "nanoid";

export default function TodoCreate() {
	const dispatch = useDispatch();
	const [newTodo, setNewTodo] = useState("");
	function handleTodoCreate() {
		if (newTodo.trim() == "") return;
		const payload = {
			id: nanoid(),
			content: newTodo,
		};
		dispatch(createTodo(payload));
		setNewTodo("");
	}
	return (
		<div className="input-group mb-3">
			<input
				type="text"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setNewTodo(e.target.value)
				}
				value={newTodo}
				className="form-control"
				placeholder="New task"
			/>
			<button
				className="btn btn-primary"
				onClick={handleTodoCreate}>
				<i className="bi bi-plus-circle"></i> Add Task
			</button>
		</div>
	);
}
