document.getElementById("fetch-button").addEventListener("click", createUser);

async function createUser() {
    renderLoadingState();
    try {
        // Capturar el nombre del jugador y su movimiento desde los inputs
        const playerName = document.getElementById("player-name").value;
        const playerMove = document.getElementById("player-move").value;

        // Si el nombre o el movimiento están vacíos, mostrar un error
        if (!playerName || !playerMove) {
            alert("Please enter a player name and select a move.");
            renderErrorState();
            return;
        }

        const player = {
            name: playerName, // Utiliza el nombre ingresado por el usuario
            move: playerMove, // Utiliza el movimiento seleccionado
            profilePicture: "https://avatar.iran.liara.run/public/13",
        };

        const response = await fetch("http://localhost:5050/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(player),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        renderData(playerName); // Pasa el nombre del jugador a la función renderData
    } catch (error) {
        renderErrorState();
    }
}

function renderErrorState() {
    const container = document.getElementById("data-container");
    container.innerHTML = "<p>Failed to load data</p>";
    console.log("Failed to load data");
}

function renderLoadingState() {
    const container = document.getElementById("data-container");
    container.innerHTML = "<p>Loading...</p>";
    console.log("Loading...");
}

function renderData(playerName) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Limpiar los datos previos
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `Player "${playerName}" created`; // Mostrar el nombre del jugador
    container.appendChild(div);
}
