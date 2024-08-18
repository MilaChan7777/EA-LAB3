document.getElementById("fetch-button").addEventListener("click", fetchResult);

async function fetchResult() {
    try {
        const response = await fetch("http://localhost:5050/result");
        if (!response.ok) {
            throw new Error("Failed to fetch results");
        }
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error(error);
        renderErrorState();
    }
}

function renderErrorState() {
    const container = document.getElementById("data-container");
    container.innerHTML = "<p>Failed to load data</p>";
}

function renderData(data) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; 
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
        <h2>${data.message}</h2>
        <p>${data.details}</p>
    `;
    container.appendChild(div);
}
