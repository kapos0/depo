import { useDispatch } from "react-redux";
import { createProduct } from "../redux/slices/dataSlice";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

export default function Modal() {
	const [productInfo, setProductInfo] = useState({
		id: "",
		name: "",
		price: "",
		url: "",
	});
	const dispatch = useDispatch();
	function handleChange(e, type) {
		if (type == "url") {
			setProductInfo((prev) => ({
				...prev,
				[e.target.name]: URL.createObjectURL(e.target.files[0]),
			}));
		} else {
			setProductInfo((prev) => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		}
	}
	function checkProductInfo() {
		if (productInfo.name && productInfo.price && productInfo.url) {
			dispatch(createProduct({ ...productInfo, id: nanoid() }));
			setProductInfo({ id: "", name: "", price: "", url: "" });
		}
	}
	return (
		<div>
			<button
				type="button"
				className="btn btn-outline-light ms-2"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop">
				<i className="bi bi-bookmark-plus"></i>
			</button>
			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="staticBackdropLabel">
								Add Product
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label className="form-label">
									Product Name
								</label>
								<input
									name="name"
									type="text"
									className="form-control"
									placeholder="Enter the product name"
									onChange={(e) => handleChange(e, "name")}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Price</label>
								<input
									name="price"
									type="number"
									className="form-control"
									placeholder="Enter the product price"
									onChange={(e) => handleChange(e, "price")}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Add Product image
								</label>
								<input
									name="url"
									type="file"
									className="form-control"
									onChange={(e) => handleChange(e, "url")}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								data-bs-dismiss="modal"
								onClick={checkProductInfo}
								className="btn btn-primary w-100">
								ADD
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
