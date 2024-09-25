import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";

export default function App() {
	return (
		<div className="container mt-5">
			<div className="card shadow-sm">
				<div className="card-header bg-primary text-white">
					<h3 className="card-title mb-0">To-Do List</h3>
				</div>
				<div className="card-body">
					<TodoCreate />
					<TodoList />
				</div>
			</div>
		</div>
	);
}
