let table;
let row_amount = 7;
let row_size = 15;

function GenerateAppleTable() {
	let table = [];
	for (let y = 0; y < row_amount; y++) {
		let row = [];
		for (let x = 0; x < row_size; x++) {
			let value = Math.floor(Math.random() * 9) + 1;
			row.push(value);
		}
		table.push(row);
	}
	return table;
}

function GenerateGrid() {
	table = GenerateAppleTable();
	let html_table = document.getElementById("game_table");
	table.forEach((y) => {
		let row = document.createElement("tr");
		// console.log(typeof row);
		y.forEach((value) => {
			let cell = document.createElement("td");
			let img = document.createElement("img");
			img.setAttribute("src", `./assets/apple${value}.png`);
			img.setAttribute("class", "apple_img");
			img.setAttribute("draggable", "false");
			img.setAttribute("name", value);
			cell.appendChild(img);
			row.appendChild(cell);
		});
		html_table.appendChild(row);
	});
}

document.onclick = function () {};
