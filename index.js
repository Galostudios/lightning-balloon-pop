const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


let gameState = {
  inflationCount: 0,
  maxInflation: 10,
  winner: null,
};

app.get('/game-state', (req, res) => {
  res.json(gameState);
});

app.post('/make-payment', (req, res) => {
  gameState.inflationCount++;

  if (gameState.inflationCount === gameState.maxInflation) {
    gameState.winner = req.body.playerId;

    gameState.inflationCount = 0;
    gameState.winner = null;
  }

  res.json(gameState);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Balloon Game Server!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
