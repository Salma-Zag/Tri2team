import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

class GameLevelHooray {
    constructor(gameEnv) {
        this.gameEnv = gameEnv;
        const path = gameEnv.path;
        
        // --- Music ---
        const music = new Audio(path + "/assets/audio/HereComesTheTimmy.mp3");
        music.loop = true;
        music.volume = 0.8;
        const startMusic = () => {
            music.play().catch(e => console.log("Music started"));
            window.removeEventListener('keydown', startMusic);
            window.removeEventListener('mousedown', startMusic);
        };
        window.addEventListener('keydown', startMusic);
        window.addEventListener('mousedown', startMusic);

        // --- Stats ---
        this.popcornCount = 0;
        this.createPopcornUI();

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/Hooray.png",
            pixels: { height: 400, width: 700 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 200, y: 600 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            down: { row: 0, start: 0, columns: 3 },
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 0, start: 0, columns: 3 },
            up: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.5, heightPercentage: 0.5 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        const popcornData = {
            id: 'popcorn',
            src: path + "/images/gamebuilder/sprites/popcorncoin.png",
            SCALE_FACTOR: 2.5, // Slightly bigger to make it easier to hit
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 400, y: 400 }, 
            pixels: { height: 400, width: 400 }, // Fixed: Corrected from 600x600 to 32x32
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.8, heightPercentage: 0.8 }
        };

        const npcData3 = {
            id: 'Trophy',
            greeting: "", 
            src: path + "/images/gamebuilder/sprites/BetterTrophy.png",
            SCALE_FACTOR: 1,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 370, y: 100 },
            pixels: { height: 400, width: 430 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.3, heightPercentage: 0.1 },
            interact: () => {
                const trophy = this.gameEnv.objects.find(obj => obj.canvas.id === 'Trophy');
                if (this.popcornCount >= 10) {
                    trophy.greeting = '"Great job!! Press E to claim your trophy."';
                    if (!this.listenerAdded) {
                        this.listenerAdded = true;
                        document.addEventListener("keydown", (e) => {
                            if (e.key.toLowerCase() === "e") window.location.href = "timmycounter.html";
                        });
                    }
                } else {
                    trophy.greeting = `"You need 10 popcorns! You only have ${this.popcornCount}."`;
                }
            }
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData3 },
            { class: Npc, data: popcornData },
            { class: Barrier, data: { id: 'dbarrier_1', x: 0, y: 0, width: 504, height: 109, visible: false } }
        ];

        this.startCollisionLoop();
    }

    startCollisionLoop() {
        const check = setInterval(() => {
            const player = this.gameEnv.objects.find(obj => obj.canvas.id === 'playerData');
            const popcorn = this.gameEnv.objects.find(obj => obj.canvas.id === 'popcorn');

            if (player && popcorn && this.popcornCount < 10) {
                if (this.isColliding(player, popcorn)) {
                    this.collectPopcorn(popcorn);
                }
            }
            if (this.popcornCount >= 10) clearInterval(check);
        }, 30); // Faster check (30ms) for smoother collection
    }

    collectPopcorn(popcorn) {
        this.popcornCount++;
        document.getElementById('popcorn-value').innerText = this.popcornCount;

        if (this.popcornCount >= 10) {
            popcorn.canvas.style.display = "none";
            popcorn.x = -2000;
        } else {
            // Respawn logic
            const newX = Math.random() * (window.innerWidth - 150) + 75;
            const newY = Math.random() * (window.innerHeight - 150) + 75;
            popcorn.x = newX;
            popcorn.y = newY;
            // Immediate visual move
            popcorn.canvas.style.left = `${newX}px`;
            popcorn.canvas.style.top = `${newY}px`;
        }
    }

    isColliding(player, popcorn) {
        // Get the real-time screen positions of both objects
        const rect1 = player.canvas.getBoundingClientRect();
        const rect2 = popcorn.canvas.getBoundingClientRect();

        // Check if the rectangles overlap
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    createPopcornUI() {
        const existing = document.getElementById('popcorn-counter');
        if (existing) existing.remove();
        const ui = document.createElement('div');
        ui.id = 'popcorn-counter';
        ui.style = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:10px 20px; background:rgba(0,0,0,0.8); color:gold; border-radius:30px; font-family:sans-serif; font-size:22px; z-index:1000; border:2px solid white;";
        ui.innerHTML = `🍿 Popcorn: <span id="popcorn-value" style="color:white;">0</span> / 10`;
        document.body.appendChild(ui);
    }
}

export default GameLevelHooray;