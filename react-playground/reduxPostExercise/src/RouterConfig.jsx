import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";

export default function RouterConfig() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Products />}
			/>
		</Routes>
	);
}
