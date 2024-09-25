import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

export default function Products() {
	const { data, keyword } = useSelector((state) => state.data);
	const filteredData = data?.filter((dt) =>
		dt.name.toLowerCase().includes(keyword)
	);
	return (
		<div>
			<div className="container d-flex gap-3 m-3">
				{filteredData?.map((dt, i) => (
					<ProductCard
						key={i}
						data={dt}
					/>
				))}
			</div>
		</div>
	);
}
