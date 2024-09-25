import { useSelector } from "react-redux";
import Todo from "./Todo";
import { RootState } from "../redux/store";
import { TodoType } from "../types/Types";

export default function TodoList() {
	const { todos } = useSelector((state: RootState) => state.todo);
	return (
		<ul className="list-group">
			{todos.map?.((todo: TodoType) => (
				<Todo
					key={todo.id}
					todo={todo}
				/>
			))}
		</ul>
	);
}
