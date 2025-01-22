let table;
let start_coordinates = [];
let end_coordinates = [];
let start_set = false;
let game_running = false;
let row_amount = 10;
let row_size = 20;
let selected_apples = [];
let apple_sum = 0;
let score = 0;
let first_touch = false;
let game_length = 60;
let timer = 0;
let call_delay = 0.1;
let click_sound = new Audio("./assets/click.mp3");

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
	html_table.innerHTML = "";
	let y_cor = 0;
	table.forEach((y) => {
		let row = document.createElement("tr");
		// console.log(typeof row);
		let x_cor = 0;
		y.forEach((value) => {
			let cell = document.createElement("td");
			let img = document.createElement("img");
			img.setAttribute("src", `./assets/apple${value}.png`);
			img.setAttribute("class", "apple_img");
			img.setAttribute("draggable", "false");
			img.setAttribute("data-value", value);
			img.setAttribute("data-x", x_cor);
			img.setAttribute("data-y", y_cor);
			img.setAttribute("id", `${x_cor}-${y_cor}`);
			img.onclick = function () {
				SetCoordinates(img.getAttribute("data-x"), img.getAttribute("data-y"));
			};
			cell.appendChild(img);
			row.appendChild(cell);
			x_cor++;
		});
		html_table.appendChild(row);
		y_cor++;
	});
	start_set = false;
	start_coordinates = [];
	end_coordinates = [];
	game_running = true;
	first_touch = false;
	timer = 0;

	document.getElementById("timer_val").style.height = `0`;
}

function SetCoordinates(x, y) {
	if (game_running) {
		PlayAudio(click_sound);
		if (!first_touch) {
			first_touch = true;
		}

		// console.log(x, y);
		if (!start_set) {
			UnselectAll();
			start_coordinates = [x, y];
			start_set = true;
			document.getElementById(`${x}-${y}`).style.backgroundColor = "blue";
			// document.getElementById("start").innerHTML = `Start: ${x}, ${y}`;
		} else {
			end_coordinates = [x, y];
			start_set = false;
			// document.getElementById("stop").innerHTML = `Stop: ${x}, ${y}`;
			SelectRange();
			RemoveApples();
		}
	}
}

function SelectRange() {
	start_x = Math.min(start_coordinates[0], end_coordinates[0]);
	end_x = Math.max(start_coordinates[0], end_coordinates[0]);
	start_y = Math.min(start_coordinates[1], end_coordinates[1]);
	end_y = Math.max(start_coordinates[1], end_coordinates[1]);

	for (let x = start_x; x <= end_x; x++) {
		for (let y = start_y; y <= end_y; y++) {
			document.getElementById(`${x}-${y}`).style.backgroundColor = "red";
			selected_apples.push([x, y]);
			apple_sum += parseInt(document.getElementById(`${x}-${y}`).getAttribute("data-value"));
		}
	}
}

function UnselectAll() {
	for (let x = 0; x < row_size; x++) {
		for (let y = 0; y < row_amount; y++) {
			document.getElementById(`${x}-${y}`).style.backgroundColor = "transparent";
			selected_apples = [];
			apple_sum = 0;
		}
	}
}

function RemoveApples() {
	if (apple_sum == 10) {
		selected_apples.forEach((apple) => {
			let x = apple[0];
			let y = apple[1];
			// document.getElementById(`${x}-${y}`).style.visibility = "hidden";
			document.getElementById(`${x}-${y}`).setAttribute("src", "./assets/empty.png");
			document.getElementById(`${x}-${y}`).setAttribute("data-value", 0);
			document.getElementById(`${x}-${y}`).innerHTML = "";
		});
		score += selected_apples.length;
		document.getElementById("score").innerHTML = `Score: ${score}`;
		UnselectAll();
	} else {
		timer += 2.5;
	}
}

function RestartGame() {
	GenerateGrid();
	score = 0;
	document.getElementById("score").innerHTML = `Score: ${score}`;
}

function StartGame() {
	score = 0;
	document.getElementById("score").innerHTML = `Score: ${score}`;
	GenerateGrid();
}

function PlaceholderGrid() {
	GenerateGrid();
	for (let x = 0; x < row_size; x++) {
		for (let y = 0; y < row_amount; y++) {
			document.getElementById(`${x}-${y}`).style.visibility = "hidden";
		}
	}
}

setInterval(() => {
	if (game_running && first_touch) {
		document.getElementById("timer_val").style.height = `${(timer / game_length) * 100}%`;
		timer += call_delay;
	}
	if (timer > game_length) {
		game_running = false;
		timer = 0;
		PlaceholderGrid();
	}
}, call_delay * 1000);

function PlayAudio(audio) {
	if (audio.paused) {
		audio.play();
	} else {
		audio.currentTime = 0;
	}
}
