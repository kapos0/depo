import { PropTypes } from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, editProduct } from "../redux/slices/dataSlice";
export default function ProductCard({ data }) {
	const [openEdit, setOpenEdit] = useState(false);
	const dispatch = useDispatch();
	let newData = {
		id: data?.id,
		name: "cars were wet",
		price: "1000",
		url: "https://picsum.photos/200",
	};
	function handleUpdate() {
		dispatch(editProduct(newData));
	}
	return (
		<div
			className="card"
			style={{ width: "18rem" }}>
			<i
				className="bi bi-three-dots ms-auto me-2"
				style={{ cursor: "pointer" }}
				onClick={() => setOpenEdit((prev) => !prev)}></i>
			<img
				src={data?.url}
				className="card-img-top"
			/>
			<div className="card-body">
				<h5 className="card-title">{data?.name}</h5>
			</div>
			<ul className="list-group list-group-flush">
				<li className="list-group-item">{data?.price}$</li>
			</ul>
			{openEdit && (
				<div className="container d-flex justify-content-between gap-3 my-2">
					<button
						className="btn btn-primary"
						onClick={handleUpdate}>
						Update
					</button>
					<button
						className="btn btn-danger"
						onClick={() => dispatch(deleteProduct(data?.id))}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
}
ProductCard.propTypes = {
	data: PropTypes.object,
};
