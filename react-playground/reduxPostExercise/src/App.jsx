import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import Header from "./components/Header";

import RouterConfig from "./RouterConfig";

export default function App() {
	return (
		<div>
			<Header />
			<RouterConfig />
		</div>
	);
}
