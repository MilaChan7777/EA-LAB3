const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

const db = {
  players: [],
  moves: {}
};

app.get("/users", (req, res) => {
  res.send(db.players);
});

app.post("/user", (req, res) => {
  const { body } = req;
  db.players.push(body);
  db.moves[body.name] = body.move; 
  res.status(201).send(body);

  if (Object.keys(db.moves).length === 2) {
    determineWinner();
  }
});

function determineWinner() {
  const [player1, player2] = db.players;

  const move1 = db.moves[player1.name];
  const move2 = db.moves[player2.name];
  
  let message = "";
  let details = "";

  if (move1 === move2) {
    message = "It's a tie!";
  } else if (
    (move1 === "rock" && move2 === "scissors") ||
    (move1 === "scissors" && move2 === "paper") ||
    (move1 === "paper" && move2 === "rock")
  ) {
    message = `${player1.name} wins!`;
  } else {
    message = `${player2.name} wins!`;
  }

  details = `${player1.name} chose ${move1}. ${player2.name} chose ${move2}.`;

  db.moves = {};

  app.get("/result", (req, res) => {
    res.json({ message, details });
  });
}

app.listen(5050, () => {
  console.log("Server is running on http://localhost:5050");
});
