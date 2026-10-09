window.addEventListener('load', () => {
    let val = 45;
    const bar = document.getElementById('load-progress');
    const txt = document.getElementById('load-text');
    
    const t = setInterval(() => {
        val += 20;
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
    }, 120);
});

function startGame(name) {
    document.getElementById('hub-screen').classList.remove('active');
    document.getElementById('play-screen').classList.add('active');
    document.getElementById('game-title-header').innerText = name;
    
    const board = document.getElementById('game-board-area');
    
    if (name === 'Tic Tac Toe') {
        renderTicTacToe(board);
    } else if (name === 'Reflex Race') {
        renderReflexRace(board);
    } else if (name === 'Cup Pong' || name === 'Throw Snow' || name === 'Crash It') {
        renderTapBattle(board, name);
    } else {
        renderGenericGame(board, name);
    }
}

// 1. Tic Tac Toe Game
function renderTicTacToe(container) {
    let cells = ['', '', '', '', '', '', '', '', ''];
    let player = 'X';
    let active = true;

    let html = `<div id="status-turn" style="margin-bottom:12px; font-size:16px; font-weight:bold; color:#ff4757;">Player ${player}'s Turn</div>`;
    html += `<div style="display:grid; grid-template-columns:repeat(3, 90px); grid-template-rows:repeat(3, 90px); gap:8px;">`;
    for (let i = 0; i < 9; i++) {
        html += `<div onclick="clickCell(this, ${i})" style="background:#e4e7eb; border-radius:12px; display:flex; justify-content:center; align-items:center; font-size:36px; font-weight:bold; cursor:pointer;" id="c-${i}"></div>`;
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
            <div onclick="tapScore('red')" style="width:100%; flex:1; background:#ff4757; color:#fff; display:flex; flex-direction:column; justify-content:center; align-items:center; border-radius:15px; cursor:pointer; margin-bottom:10px;">
                <h2 style="font-size:24px;">RED PLAYER</h2>
                <h1 id="score-red" style="font-size:50px;">0</h1>
            </div>
            <div onclick="tapScore('blue')" style="width:100%; flex:1; background:#1e90ff; color:#fff; display:flex; flex-direction:column; justify-content:center; align-items:center; border-radius:15px; cursor:pointer;">
                <h2 style="font-size:24px;">BLUE PLAYER</h2>
                <h1 id="score-blue" style="font-size:50px;">0</h1>
            </div>
        </div>
    `;
    let r = 0, b = 0;
    window.tapScore = function(p) {
        if(p === 'red') { r++; document.getElementById('score-red').innerText = r; }
        else { b++; document.getElementById('score-blue').innerText = b; }
    }
}

// 3. Tap Battle for other action games
function renderTapBattle(container, name) {
    container.innerHTML = `
        <div style="text-align:center;">
            <h3 style="color:#2f3542; margin-bottom:10px;">${name} Dual Arena</h3>
            <p style="color:#747d8c; font-size:14px; margin-bottom:20px;">Tap rapidly to win the battle!</p>
            <div style="display:flex; gap:20px;">
                <button onclick="alert('Red Player Won the Round!')" style="padding:15px 25px; background:#ff4757; color:#fff; border:none; border-radius:12px; font-weight:bold; font-size:16px;">Red Tap 🔴</button>
                <button onclick="alert('Blue Player Won the Round!')" style="padding:15px 25px; background:#1e90ff; color:#fff; border:none; border-radius:12px; font-weight:bold; font-size:16px;">Blue Tap 🔵</button>
            </div>
        </div>
    `;
}

// 4. Generic Fallback for remaining games
function renderGenericGame(container, name) {
    container.innerHTML = `
        <div style="text-align:center;">
            <h3 style="color:#2f3542; margin-bottom:8px;">${name} Mode</h3>
            <p style="color:#747d8c; font-size:13px; margin-bottom:15px;">2-Player VS Mode Loaded Successfully!</p>
            <button onclick="alert('Match Started & Running!')" style="padding:10px 20px; background:#2ed573; color:#fff; border:none; border-radius:10px; font-weight:bold;">Start Match</button>
        </div>
    `;
}

function goHome() {
    document.getElementById('play-screen').classList.remove('active');
    document.getElementById('hub-screen').classList.add('active');
}

function openSettings() {
    alert('Settings: Sound ON, Vibration ON');
}
