import { useDispatch } from "react-redux";
import { TodoType } from "../types/Types";
import { deleteTodo, editTodo } from "../redux/todoSlice";
import { useState } from "react";
interface todo {
	todo: TodoType;
}
export default function Todo({ todo }: todo) {
	const id: string = todo.id;
	const content: string = todo.content;
	const dispatch = useDispatch();
	const [editable, setEditable] = useState(false);
	const [newTodo, setNewTodo] = useState(content);
	function handleTodoEdit() {
		const payload: TodoType = { id, content: newTodo };
		dispatch(editTodo(payload));
	}
	function handleTodoDelete() {
		dispatch(deleteTodo(id));
	}
	return (
		<li className="list-group-item d-flex align-items-center justify-content-between">
			<span>
				{editable ? (
					<input
						type="text"
						value={newTodo}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setNewTodo(e.target.value)
						}
						className="form-control"
					/>
				) : (
					<span>{content}</span>
				)}
			</span>
			<div>
				<button
					className="btn btn-success mx-2"
					onClick={handleTodoEdit}>
					{editable ? (
						<i
							className="bi bi-check"
							onClick={() => setEditable(!editable)}></i>
					) : (
						<i
							className="bi bi-vector-pen"
							onClick={() => setEditable(!editable)}></i>
					)}
				</button>
				<button
					className="btn btn-danger mx-2"
					onClick={handleTodoDelete}>
					<i className="bi bi-trash2-fill"></i>
				</button>
			</div>
		</li>
	);
}
