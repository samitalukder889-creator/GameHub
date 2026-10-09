window.addEventListener('load', () => {
    let val = 50;
    const bar = document.getElementById('load-progress');
    const txt = document.getElementById('load-text');
    
    const t = setInterval(() => {
        val += 25;
        if (val > 100) val = 100;
        bar.style.width = val + '%';
        txt.innerText = val + '%';
        
        if (val === 100) {
            clearInterval(t);
            setTimeout(() => {
                document.getElementById('splash-screen').classList.remove('active');
                document.getElementById('hub-screen').classList.add('active');
            }, 250);
        }
    }, 100);
});

function startGame(name) {
    document.getElementById('hub-screen').classList.remove('active');
    document.getElementById('play-screen').classList.add('active');
    document.getElementById('game-title-header').innerText = name;
    
    const board = document.getElementById('game-board-area');
    board.innerHTML = "";
    
    if (name === 'Tic Tac Toe') {
        renderTicTacToe(board);
    } else if (name === 'Reflex Race') {
        renderReflexRace(board);
    } else if (name === 'Cup Pong') {
        renderTapDuel(board, 'Cup Pong', '#00cec9');
    } else if (name === 'Snake Retro') {
        renderTapDuel(board, 'Snake Retro', '#badc58');
    }
}

// 1. Tic Tac Toe (Playable 2 Player)
function renderTicTacToe(container) {
    let cells = ['', '', '', '', '', '', '', '', ''];
    let player = 'X';
    let active = true;

    let html = `<div id="status-turn" style="margin-bottom:15px; font-size:18px; font-weight:bold; color:#ff4757;">Player ${player}'s Turn</div>`;
    html += `<div style="display:grid; grid-template-columns:repeat(3, 95px); grid-template-rows:repeat(3, 95px); gap:8px;">`;
    for (let i = 0; i < 9; i++) {
        html += `<div onclick="clickCell(this, ${i})" style="background:#e4e7eb; border-radius:14px; display:flex; justify-content:center; align-items:center; font-size:40px; font-weight:bold; cursor:pointer;" id="c-${i}"></div>`;
    }
    html += `</div>`;
    container.innerHTML = html;

    window.clickCell = function(el, idx) {
        if (!active || cells[idx] !== '') return;
        cells[idx] = player;
        el.innerText = player;
        el.style.color = player === 'X' ? '#ff4757' : '#1e90ff';

        const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        let won = false;
        for (let w of wins) {
            if (cells[w[0]] && cells[w[0]] === cells[w[1]] && cells[w[0]] === cells[w[2]]) {
                won = true;
                break;
            }
        }

        if (won) {
            document.getElementById('status-turn').innerHTML = `🎉 Player ${player} Wins!`;
            active = false;
            return;
        }

        if (!cells.includes('')) {
            document.getElementById('status-turn').innerHTML = `🤝 Match Draw!`;
            active = false;
            return;
        }

        player = player === 'X' ? 'O' : 'X';
        document.getElementById('status-turn').innerHTML = `Player ${player}'s Turn`;
    };
}

// 2. Reflex Race (Fast Tapping Duel)
function renderReflexRace(container) {
    container.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column; justify-content:space-between; align-items:center;">
            <div onclick="tapScore('red')" style="width:100%; flex:1; background:#ff4757; color:#fff; display:flex; flex-direction:column; justify-content:center; align-items:center; border-radius:16px; cursor:pointer; margin-bottom:10px;">
                <h2 style="font-size:22px;">RED PLAYER</h2>
                <h1 id="score-red" style="font-size:55px;">0</h1>
            </div>
            <div onclick="tapScore('blue')" style="width:100%; flex:1; background:#1e90ff; color:#fff; display:flex; flex-direction:column; justify-content:center; align-items:center; border-radius:16px; cursor:pointer;">
                <h2 style="font-size:22px;">BLUE PLAYER</h2>
                <h1 id="score-blue" style="font-size:55px;">0</h1>
            </div>
        </div>
    `;
    let r = 0, b = 0;
    window.tapScore = function(p) {
        if(p === 'red') { r++; document.getElementById('score-red').innerText = r; }
        else { b++; document.getElementById('score-blue').innerText = b; }
    }
}

// 3. Action Tap Duel for Cup Pong & Snake
function renderTapDuel(container, title, color) {
    container.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column; justify-content:space-between; align-items:center;">
            <div onclick="actionTap('red')" style="width:100%; flex:1; background:${color}; color:#2f3542; display:flex; flex-direction:column; justify-content:center; align-items:center; border-radius:16px; cursor:pointer; margin-bottom:10px; border:4px solid #ff4757;">
                <h2 style="font-size:20px;">RED (TAP FAST)</h2>
                <h1 id="act-red" style="font-size:50px;">0</h1>
            </div>
            <div onclick="actionTap('blue')" style="width:100%; flex:1; background:${color}; color:#2f3542; display:flex; flex-direction:column; justify-content:center; align-items:center; border-radius:16px; cursor:pointer; border:4px solid #1e90ff;">
                <h2 style="font-size:20px;">BLUE (TAP FAST)</h2>
                <h1 id="act-blue" style="font-size:50px;">0</h1>
            </div>
        </div>
    `;
    let ar = 0, ab = 0;
    window.actionTap = function(p) {
        if(p === 'red') { ar++; document.getElementById('act-red').innerText = ar; }
        else { ab++; document.getElementById('act-blue').innerText = ab; }
    }
}

function goHome() {
    document.getElementById('play-screen').classList.remove('active');
    document.getElementById('hub-screen').classList.add('active');
}
