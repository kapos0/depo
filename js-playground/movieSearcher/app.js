const userInputEl = document.getElementById("usrInput");
const searchBtn = document.getElementById("search-btn");
const movieTitles = Array.from(document.querySelectorAll(".card-title"));
function search() {
	let removedEls = Array.from(document.querySelectorAll(".d-none"));
	removedEls.forEach((element) => element.classList.remove("d-none"));
	let userInput = userInputEl.value.toLowerCase();
	movieTitles.map((movieTitle) => {
		if (!movieTitle.textContent.toLowerCase().includes(userInput)) {
			movieTitle.parentElement.parentElement.classList.add("d-none");
		}
	});
}
searchBtn.addEventListener("click", search);
document.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		search();
	}
});
