import { useState, useRef } from "react";
import "./App.css";
import circle_icon from "./assets/circle.png";
import cross_icon from "./assets/cross.png";

function App() {
	let [dataArr, setDataArr] = useState(["", "", "", "", "", "", "", "", ""]);
	let [count, setCount] = useState(0);
	let [lock, setLock] = useState(false);
	let titleRef = useRef(null);

	function toggle(num) {
		if (lock || dataArr[num] !== "") {
			return;
		}

		const newDataArr = [...dataArr];
		if (count % 2 === 0) {
			newDataArr[num] = "x";
		} else {
			newDataArr[num] = "o";
		}

		setDataArr(newDataArr);
		setCount((prev) => prev + 1);
		checkWin(newDataArr);
	}

	function checkWin(dataArr) {
		const winPatterns = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let pattern of winPatterns) {
			const [a, b, c] = pattern;
			if (
				dataArr[a] &&
				dataArr[a] === dataArr[b] &&
				dataArr[a] === dataArr[c]
			) {
				won(dataArr[a]);
				return;
			}
		}

		if (!dataArr.includes("")) {
			titleRef.current.innerHTML = "It's a draw!";
			setLock(true);
		}
	}

	function won(winner) {
		setLock(true);
		if (winner === "x")
			titleRef.current.innerHTML = `Congratulations <img src=${cross_icon}>`;
		else
			titleRef.current.innerHTML = `Congratulations <img src=${circle_icon}>`;
	}

	function reset() {
		setLock(false);
		setDataArr(["", "", "", "", "", "", "", "", ""]);
		setCount(0);
		titleRef.current.innerHTML = "Tic Tac Toe In <span>React</span>";
	}

	return (
		<div className="container">
			<h1
				className="title"
				ref={titleRef}>
				Tic Tac Toe In <span>React</span>
			</h1>
			<div className="board">
				<div className="row1">
					{dataArr.slice(0, 3).map((val, idx) => (
						<div
							key={idx}
							className="boxes"
							onClick={() => toggle(idx)}
							dangerouslySetInnerHTML={{
								__html: val
									? `<img src=${
											val === "x"
												? cross_icon
												: circle_icon
									  }>`
									: "",
							}}></div>
					))}
				</div>
				<div className="row2">
					{dataArr.slice(3, 6).map((val, idx) => (
						<div
							key={idx + 3}
							className="boxes"
							onClick={() => toggle(idx + 3)}
							dangerouslySetInnerHTML={{
								__html: val
									? `<img src=${
											val === "x"
												? cross_icon
												: circle_icon
									  }>`
									: "",
							}}></div>
					))}
				</div>
				<div className="row3">
					{dataArr.slice(6, 9).map((val, idx) => (
						<div
							key={idx + 6}
							className="boxes"
							onClick={() => toggle(idx + 6)}
							dangerouslySetInnerHTML={{
								__html: val
									? `<img src=${
											val === "x"
												? cross_icon
												: circle_icon
									  }>`
									: "",
							}}></div>
					))}
				</div>
			</div>
			<button
				type="button"
				className="reset-btn"
				onClick={reset}>
				Reset
			</button>
		</div>
	);
}

export default App;
