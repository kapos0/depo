import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoInitialState, TodoType } from "../types/Types";

function writeToLocal(todos: TodoType[]): void {
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getFromLocal() {
	const todos = localStorage.getItem("todos");
	if (todos) {
		return JSON.parse(todos);
	}
	return [];
}

const initialState: TodoInitialState = {
	todos: getFromLocal(),
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		createTodo: (
			state: TodoInitialState,
			action: PayloadAction<TodoType>
		) => {
			state.todos = [...state.todos, action.payload];
			writeToLocal(state.todos);
		},
		editTodo: (
			state: TodoInitialState,
			action: PayloadAction<TodoType>
		) => {
			const { id, content } = action.payload;
			const extractedTodos: TodoType[] = state.todos?.filter(
				(todo: TodoType) => todo.id !== id
			);
			const newTodo = { id, content };
			state.todos = [newTodo, ...extractedTodos];
			writeToLocal(state.todos);
		},
		deleteTodo: (
			state: TodoInitialState,
			action: PayloadAction<string>
		) => {
			const extractedTodos: TodoType[] = state.todos?.filter(
				(todo: TodoType) => todo.id !== action.payload
			);
			state.todos = [...extractedTodos];
			writeToLocal(state.todos);
		},
	},
});

export const { createTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
