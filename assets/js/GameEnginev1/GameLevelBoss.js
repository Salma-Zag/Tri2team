import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Enemy from './essentials/Enemy.js';
import Projectile from './Projectile.js';

/* ---------------- SETUP ---------------- */

class GameLevelBattle {
    constructor(gameEnv) {
        const self = this; // 🔥 IMPORTANT FIX

        const path = gameEnv.path;

        const bgData = {
            name: 'bg',
            src: path + '/images/gamebuilder/bg/Hell.png',
            pixels: { height: 400, width: 700 }
        };

        const playerData = {
            id: 'Kirby',
            src: path + '/images/gamebuilder/sprites/kirby.png',
            SCALE_FACTOR: 5,
            ANIMATION_RATE: 50,
            STEP_FACTOR: 500,
            INIT_POSITION: { x: 400, y: 300 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            hitbox: { widthPercentage: 1, heightPercentage: 1 },
            keypress: { up: 87, left: 65, down: 83, right: 68 },
            health: 100
        };

        const enemyData = {
            id: 'Enemy',
            src: path + '/images/gamebuilder/sprites/GarettThePopcornMan.png',
            SCALE_FACTOR: 2,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 650, y: 540 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            health: 200,
            lastHit: 0
        };

        this.projectiles = [];

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Enemy, data: enemyData }
        ];

        createHealthBar();
        updateHealthBar(100);
        createEnemyHealthBar();

        setTimeout(() => {
            const objs = gameEnv.gameObjects;

            const player = objs.find(o => o.constructor.name === 'Player');
            const enemy = objs.find(o => o.constructor.name === 'Enemy');

            if (!player || !enemy) return;

            const originalUpdate = enemy.update?.bind(enemy);

            enemy.update = function () {
                if (originalUpdate) originalUpdate();

                const p = player.position;
                const e = enemy.position;

                const touching =
                    p.x < e.x + 100 &&
                    p.x + 50 > e.x &&
                    p.y < e.y + 100 &&
                    p.y + 50 > e.y;

                /* ---------------- ENEMY HEALTH BAR ---------------- */
                updateEnemyHealthBar(enemy);

                /* ---------------- PROJECTILES ---------------- */
                for (let i = self.projectiles.length - 1; i >= 0; i--) {
                    const proj = self.projectiles[i];

                    if (!proj || !proj.active) {
                        self.projectiles.splice(i, 1);
                        continue;
                    }

                    proj.update();

                    const hit =
                        proj.position.x < e.x + 100 &&
                        proj.position.x + 10 > e.x &&
                        proj.position.y < e.y + 100 &&
                        proj.position.y + 10 > e.y;

                    if (hit) {
                        proj.destroy();

                        enemy.data.health -= 10;

                        if (enemy.data.health <= 0) {
                            enemy.data.health = 0;
                            showWinScreen();
                        }

                        updateEnemyHealthBar(enemy);

                        console.log("ENEMY HIT", enemy.data.health);

                        self.projectiles.splice(i, 1);
                    }
                }

                /* ---------------- PLAYER DAMAGE ---------------- */
                if (touching) {
                    const now = Date.now();

                    if (now - enemy.data.lastHit > 500) {
                        enemy.data.lastHit = now;

                        player.data.health -= 10;

                        if (player.data.health <= 0) {
                            player.data.health = 0;
                            updateHealthBar(0);
                            showGameOver();
                        } else {
                            updateHealthBar(player.data.health);
                        }
                    }
                }

                /* ---------------- SHOOT PROJECTILE ---------------- */
                if (window.keys && window.keys[32] && !window.spacePressed) {
                    window.spacePressed = true;

                    const projectile = new Projectile(
                        { x: p.x, y: p.y },
                        { x: 1, y: 0 }
                    );

                    self.projectiles.push(projectile);
                }

                if (!window.keys[32]) {
                    window.spacePressed = false;
                }
            };

        }, 500);
    }
}

/* ---------------- INPUT ---------------- */

window.keys = {};

window.addEventListener('keydown', e => {
    window.keys[e.keyCode] = true;
});

window.addEventListener('keyup', e => {
    window.keys[e.keyCode] = false;
});

/* ---------------- HEALTH BARS ---------------- */

function createHealthBar() {
    let existing = document.getElementById('player-health-container');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'player-health-container';

    Object.assign(container.style, {
        position: 'fixed',
        top: '60px',
        left: '20px',
        width: '240px',
        height: '24px',
        background: '#222',
        border: '2px solid white',
        zIndex: '9999'
    });

    const bar = document.createElement('div');
    bar.id = 'player-health-bar';

    Object.assign(bar.style, {
        width: '100%',
        height: '100%',
        background: 'lime'
    });

    container.appendChild(bar);
    document.body.appendChild(container);
}

function updateHealthBar(value) {
    const bar = document.getElementById('player-health-bar');
    if (!bar) return;

    const pct = Math.max(0, Math.min(100, value));

    bar.style.width = pct + '%';
    bar.style.background =
        pct > 50 ? 'lime' :
        pct > 25 ? 'orange' : 'red';
}

/* ---------------- ENEMY HEALTH BAR ---------------- */

function createEnemyHealthBar() {
    let existing = document.getElementById('enemy-health-bar');
    if (existing) existing.remove();

    const bar = document.createElement('div');
    bar.id = 'enemy-health-bar';

    Object.assign(bar.style, {
        position: 'absolute',
        width: '80px',
        height: '8px',
        background: 'lime',
        zIndex: '9999'
    });

    document.body.appendChild(bar);
}

function updateEnemyHealthBar(enemy) {
    const bar = document.getElementById('enemy-health-bar');
    if (!bar) return;

    const maxHealth = 200;
    const pct = Math.max(0, enemy.data.health / maxHealth);

    bar.style.width = (pct * 80) + 'px';
    bar.style.background =
        pct > 0.5 ? 'lime' :
        pct > 0.25 ? 'orange' : 'red';

    bar.style.left = enemy.position.x + 'px';
    bar.style.top = (enemy.position.y - 10) + 'px';
}

/* ---------------- SCREENS ---------------- */

function showWinScreen() {
    if (document.getElementById('win-screen')) return;

    const screen = document.createElement('div');
    screen.id = 'win-screen';

    Object.assign(screen.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '48px',
        zIndex: '999999'
    });

    screen.innerText = 'YOU WIN 🎉';
    document.body.appendChild(screen);
}

function showGameOver() {
    if (document.getElementById('game-over-screen')) return;

    const screen = document.createElement('div');
    screen.id = 'game-over-screen';

    Object.assign(screen.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '48px',
        zIndex: '999999'
    });

    screen.innerText = 'GAME OVER';
    document.body.appendChild(screen);
}

export default GameLevelBattle;