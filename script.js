function GenerateGrid() {
	let table = document.getElementById("game_table");
	table.innerHTML = "";
	for (let row = 0; row < 5; row++) {
		let tr = document.createElement("tr");
		for (let cell = 0; cell < 10; cell++) {
			let td = document.createElement("td");
			td.className = "apple_cell";
			tr.appendChild(td);
			console.log(row, cell);
		}
		table.appendChild(tr);
	}
	cells = document.querySelectorAll(".apple_cell");
	cells.forEach((cell) => {
		// generate apple img
		let img = document.createElement("img");
		let value = Math.floor(Math.random() * 9) + 1;
		img.setAttribute("src", `./assets/apple${value}.png`);
		img.setAttribute("class", "apple_img");
		img.setAttribute("draggable", "false");

		// generate apple value
		// let text = document.createElement("p");
		// text.setAttribute("class", "apple_value");
		// text.innerHTML = ;

		// append both to every cell
		cell.appendChild(img);
		// cell.appendChild(text);
	});
}
