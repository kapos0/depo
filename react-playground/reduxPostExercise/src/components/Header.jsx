import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useDispatch } from "react-redux";
import { findData, sortData } from "../redux/slices/dataSlice";
import { useState } from "react";
export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userInput, setUserInput] = useState("");
	return (
		<nav className="navbar navbar-expand-lg bg-primary">
			<div className="container-fluid">
				<a
					className="navbar-brand text-light"
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/")}>
					Home
				</a>
				<div className="d-flex justify-content-between">
					<select
						className="form-select"
						onChange={(e) => dispatch(sortData(e.target.value))}>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
					<form className="d-flex ms-4">
						<input
							className="form-control me-2"
							style={{ width: "220px" }}
							type="text"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							placeholder="Search"
						/>
						<button
							className="btn btn-outline-light"
							type="button"
							onClick={() => dispatch(findData(userInput))}>
							Search
						</button>
						<Modal />
					</form>
				</div>
			</div>
		</nav>
	);
}
