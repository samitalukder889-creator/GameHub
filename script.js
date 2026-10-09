// Splash Screen Loading Animation Simulation
window.addEventListener('load', () => {
    let progress = 0;
    const fill = document.getElementById('loader-fill');
    const text = document.getElementById('loader-text');
    
    const interval = setInterval(() => {
        progress += 5;
        fill.style.width = progress + '%';
        text.innerText = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('splash-screen').classList.remove('active');
                document.getElementById('hub-screen').classList.add('active');
            }, 300);
        }
    }, 40);
});

function openGame(gameType) {
    document.getElementById('hub-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    
    const title = document.getElementById('current-game-title');
    const arena = document.getElementById('game-arena');
    arena.innerHTML = "";

    if (gameType === 'tictactoe') {
        title.innerText = "Tic Tac Toe (Player vs Player)";
        setupTicTacToe(arena);
    } else if (gameType === 'pong') {
        title.innerText = "Pong Arcade";
        arena.innerHTML = `<h3 style="color:#00ffcc; margin-bottom:10px;">Pong Retro Arena</h3><p style="color:#aaa; font-size:13px; text-align:center; margin-bottom:15px;">Fast-paced table tennis action.</p><button onclick="alert('Starting Pong Match!')" style="padding:10px 20px; background:#00c6ff; border:none; border-radius:8px; font-weight:bold; color:#fff;">Start Game</button>`;
    } else if (gameType === 'snake') {
        title.innerText = "Snake Retro";
        arena.innerHTML = `<h3 style="color:#38ef7d; margin-bottom:10px;">Classic Snake Game</h3><p style="color:#aaa; font-size:13px; text-align:center; margin-bottom:15px;">Eat food and grow longer without crashing!</p><button onclick="alert('Snake Game Initialized!')" style="padding:10px 20px; background:#38ef7d; border:none; border-radius:8px; font-weight:bold; color:#000;">Play Snake</button>`;
    } else if (gameType === 'car') {
        title.innerText = "Car Rush";
        arena.innerHTML = `<h3 style="color:#eb3349; margin-bottom:10px;">High Speed Racing</h3><p style="color:#aaa; font-size:13px; text-align:center; margin-bottom:15px;">Dodge traffic and set high scores!</p><button onclick="alert('Engine Started!')" style="padding:10px 20px; background:#eb3349; border:none; border-radius:8px; font-weight:bold; color:#fff;">Race Now</button>`;
    } else if (gameType === 'ludo') {
        title.innerText = "Ludo Arena";
        arena.innerHTML = `<h3 style="color:#fcb045; margin-bottom:10px;">Mini Ludo Board</h3><p style="color:#aaa; font-size:13px; text-align:center; margin-bottom:15px;">Roll the dice and race your tokens home!</p><button onclick="alert('Rolling Dice... 6!')" style="padding:10px 20px; background:#fcb045; border:none; border-radius:8px; font-weight:bold; color:#000;">Roll Dice</button>`;
    } else {
        title.innerText = "Memory Flip";
        arena.innerHTML = `<h3 style="color:#8f94fb; margin-bottom:10px;">Brain Puzzle</h3><p style="color:#aaa; font-size:13px; text-align:center; margin-bottom:15px;">Match the pairs to win!</p><button onclick="alert('Puzzle Started!')" style="padding:10px 20px; background:#8f94fb; border:none; border-radius:8px; font-weight:bold; color:#fff;">Start Puzzle</button>`;
    }
}

function setupTicTacToe(container) {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let active = true;

    let html = `<div style="margin-bottom:10px; font-size:14px; color:#ff3366;">Player Turn: <span id="turn-indicator">X</span></div>`;
    html += `<div class="ttt-board">`;
    for (let i = 0; i < 9; i++) {
        html += `<div class="ttt-cell" onclick="makeMove(this, ${i})" id="cell-${i}"></div>`;
    }
    html += `</div><button onclick="openGame('tictactoe')" style="margin-top:15px; padding:6px 12px; background:#333; color:#fff; border:none; border-radius:6px; font-size:12px;">Reset Board</button>`;
    container.innerHTML = html;
}

function returnToHub() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('hub-screen').classList.add('active');
}
