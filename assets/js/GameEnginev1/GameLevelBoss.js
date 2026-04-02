import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';

class GameLevelBoss {
    constructor(gameEnv) {
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;
        const path = gameEnv.path;

        const floorData = {
            name: 'floor',
            src: path + '/images/placeholders/floor.png',
            pixels: { height: 341, width: 498 }
        };

        const playerData = {
            id: 'Spook',
            greeting: 'Hi, I am Spook.',
            src: path + '/images/placeholders/player.png',
            SCALE_FACTOR: 7,
            STEP_FACTOR: 1500,
            ANIMATION_RATE: 100,
            INIT_POSITION: {
                x: width / 2 - width / 35,
                y: height - height / 7
            },
            pixels: { height: 2400, width: 3600 },
            orientation: { rows: 2, columns: 3 },
            down: { row: 1, start: 0, columns: 3 },
            downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI / 16 },
            downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI / 16 },
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            up: { row: 1, start: 0, columns: 3 },
            upLeft: { row: 0, start: 0, columns: 3, rotate: Math.PI / 16 },
            upRight: { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 },
            health: 100
        };

        const npcData = {
            id: 'Reaper',
            greeting: 'You feel a dark presence...',
            src: path + '/images/placeholders/reaper.png',
            SCALE_FACTOR: 4,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: width / 2, y: height / 2 },
            pixels: { height: 104, width: 132 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.4, heightPercentage: 0 },
            zIndex: 10,
            isKilling: false,
            update: function () {
                if (this.isKilling) return;
                if (typeof window !== 'undefined' && !window.__battleRoomFadeComplete) return;

                const players = this.gameEnv.gameObjects.filter(obj =>
                    obj.constructor.name === 'Player'
                );

                if (players.length === 0) return;

                let nearest = players[0];
                let minDist = Infinity;

                for (const player of players) {
                    const dx = player.position.x - this.position.x;
                    const dy = player.position.y - this.position.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < minDist) {
                        minDist = dist;
                        nearest = player;
                    }
                }

                const speed = 0.3;
                const dx = nearest.position.x - this.position.x;
                const dy = nearest.position.y - this.position.y;
                const angle = Math.atan2(dy, dx);

                this.position.x += Math.cos(angle) * speed;
                this.position.y += Math.sin(angle) * speed;

                for (const player of players) {
                    const playerX = player.position.x + player.width / 2;
                    const playerY = player.position.y + player.height / 2;
                    const enemyX = this.position.x + this.width / 2;
                    const enemyY = this.position.y + this.height / 2;

                    const ddx = playerX - enemyX;
                    const ddy = playerY - enemyY;
                    const distance = Math.sqrt(ddx * ddx + ddy * ddy);

                    const collisionThreshold =
                        (player.width * player.hitbox.widthPercentage +
                            this.width * this.hitbox.widthPercentage) / 2;

                    if (distance < collisionThreshold) {
                        this.isKilling = true;
                        nearest.data.health = 0;

                        if (typeof showDeathScreen === 'function') {
                            showDeathScreen(nearest);
                        }

                        break;
                    }
                }
            }
        };

        this.classes = [
            { class: GameEnvBackground, data: floorData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData }
        ];

        if (typeof window !== 'undefined') {
            const container = document.createElement('div');
            container.id = 'instructions-container';
            Object.assign(container.style, {
                position: 'absolute',
                bottom: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                width: '60%',
                zIndex: '100'
            });

            container.textContent = 'WASD to move, avoid the Reaper';
            container.style.color = '#00ffffff';
            container.style.fontFamily = "'Press Start 2P', sans-serif";
            container.style.fontSize = '16px';
            container.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';

            const gameContainer = document.querySelector('canvas')?.parentElement || document.body;
            gameContainer.appendChild(container);
        }
    }
}

export default GameLevelBoss;