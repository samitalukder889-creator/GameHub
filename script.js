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
    } else {
        board.innerHTML = `
            <div style="text-align:center;">
                <h3 style="color:#2f3542; margin-bottom:8px;">${name} Arena</h3>
                <p style="color:#747d8c; font-size:13px; margin-bottom:15px;">2-Player Challenge Mode Ready!</p>
                <button onclick="alert('Match Started!')" style="padding:10px 20px; background:#2ed573; color:#fff; border:none; border-radius:10px; font-weight:bold;">Start Match</button>
            </div>
        `;
    }
}

function renderTicTacToe(container) {
    let cells = ['', '', '', '', '', '', '', '', ''];
    let player = 'X';
    let active = true;

    let html = `<div id="status-turn" style="margin-bottom:12px; font-size:15px; font-weight:bold; color:#ff4757;">Player ${player}'s Turn</div>`;
    html += `<div style="display:grid; grid-template-columns:repeat(3, 80px); grid-template-rows:repeat(3, 80px); gap:6px;">`;
    for (let i = 0; i < 9; i++) {
        html += `<div onclick="clickCell(this, ${i})" style="background:#e4e7eb; border-radius:10px; display:flex; justify-content:center; align-items:center; font-size:32px; font-weight:bold; cursor:pointer;" id="c-${i}"></div>`;
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

function goHome() {
    document.getElementById('play-screen').classList.remove('active');
    document.getElementById('hub-screen').classList.add('active');
}

function openSettings() {
    alert('Settings: Sound ON, Vibration ON');
}
