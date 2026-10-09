function startGame(game) {
    const container = document.getElementById('game-container');
    if (game === 'tictactoe') {
        container.innerHTML = '<h2>Tic-Tac-Toe Game Loaded</h2>';
    } else if (game === 'pong') {
        container.innerHTML = '<h2>Pong Game Loaded</h2>';
    }
}
