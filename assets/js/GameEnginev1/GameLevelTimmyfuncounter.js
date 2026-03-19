import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

class GameLevelTimmyfuncounter {
    constructor(gameEnv) {

        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/TimmyFrameBg.png",
            pixels: { height: 720, width: 1280 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 8,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 60, y: 278 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },

            down: { row: 0, start: 0, columns: 3 },
            downRight: { row: 0, start: 0, columns: 3, rotate: Math.PI/16 },
            downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 0, start: 0, columns: 3 },
            up: { row: 0, start: 0, columns: 3 },
            upLeft: { row: 0, start: 0, columns: 3, rotate: Math.PI/16 },
            upRight: { row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },

            hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        // 🎵 MUSIC
        const music = new Audio(path + "/assets/audio/SubwaySurfers.mp3");
        music.loop = true;
        music.volume = 0.4;
        let musicStarted = false;

        let playerRef = null;

        const npcData1 = {
            id: 'Garret',
            greeting: '"Good luck! You will need it..."',
            src: path + "/images/gamebuilder/sprites/Garret2.png",
            SCALE_FACTOR: 4,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 100, y: 100 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 },
            dialogues: ['"Good luck! You will need it..."'],

            reaction: function() {
                if (!this.teleported) return;

                if (window.currentSteps <= window.stepGoal) {
                    alert("🎉 You found Garrett in time! You win!");
                } else {
                    alert("Too many steps! Try again!");
                }
            },

            interact: function() {

                if (this.dialogueSystem) {
                    this.showRandomDialogue();
                }

                // ▶️ PLAY MUSIC ON FIRST INTERACTION
                if (!musicStarted) {
                    music.play().catch(() => {});
                    musicStarted = true;
                }

                if (!this.teleported) {
                    this.teleported = true;
                    this.visible = false;

                    setTimeout(() => {
                        this.position.x = window.innerWidth - 120;
                        this.position.y = window.innerHeight / 2;
                        this.visible = true;
                    }, 500);
                }
            }
        };

        // 🔥 INVISIBLE MAZE WALLS (WORKING)
        const mazeWalls = [
            { x: 0, y: 0, width: width, height: 20 },
            { x: 0, y: height - 20, width: width, height: 20 },
            { x: width * 0.2, y: 0, width: 20, height: height * 0.6 },
            { x: width * 0.4, y: height * 0.4, width: 20, height: height * 0.6 },
            { x: width * 0.6, y: 0, width: 20, height: height * 0.6 },
            { x: width * 0.8, y: height * 0.4, width: 20, height: height * 0.6 }
        ];

        const wallClasses = mazeWalls.map(wall => ({
            class: Barrier,
            data: {
                id: "wall_" + Math.random(),
                x: wall.x,
                y: wall.y,
                width: wall.width,
                height: wall.height,
                color: "transparent"
            }
        }));

        window.addEventListener("load", () => {

            const STEP_GOAL = 200;

            window.currentSteps = 0;
            window.stepGoal = STEP_GOAL;

            // 🌑 FADE SCREEN
            const fade = document.createElement("div");
            fade.style.position = "fixed";
            fade.style.top = "0";
            fade.style.left = "0";
            fade.style.width = "100%";
            fade.style.height = "100%";
            fade.style.background = "black";
            fade.style.opacity = "0";
            fade.style.transition = "opacity 1s";
            fade.style.zIndex = "9999";
            fade.style.display = "flex";
            fade.style.flexDirection = "column";
            fade.style.alignItems = "center";
            fade.style.justifyContent = "center";
            fade.style.color = "white";
            fade.style.fontFamily = "Arial";
            document.body.appendChild(fade);

            const message = document.createElement("div");
            message.style.fontSize = "42px";
            message.style.marginBottom = "20px";
            fade.appendChild(message);

            const restartText = document.createElement("div");
            restartText.textContent = "Press R to Restart";
            restartText.style.fontSize = "28px";
            restartText.style.opacity = "0";
            fade.appendChild(restartText);

            setInterval(() => {
                restartText.style.opacity = restartText.style.opacity === "0" ? "1" : "0";
            }, 600);

            // HUD
            const hud = document.createElement("div");
            hud.style.position = "fixed";
            hud.style.bottom = "20px";
            hud.style.left = "50%";
            hud.style.transform = "translateX(-50%)";
            hud.style.zIndex = "10000";
            document.body.appendChild(hud);

            const stepCounterEl = document.createElement("div");
            stepCounterEl.style.cssText = `
                color:white;
                font-size:26px;
                font-family:Arial;
                background:rgba(0,0,0,0.6);
                padding:10px 18px;
                border-radius:10px;
                box-shadow:0px 0px 10px black;
            `;
            stepCounterEl.textContent = "Steps: 0 / " + STEP_GOAL;
            hud.appendChild(stepCounterEl);

            let steps = 0;
            let gameOver = false;

            setTimeout(() => {
                playerRef = gameEnv.gameObjects.find(obj => obj.id === 'playerData');
            }, 500);

            document.addEventListener("keydown", (e) => {

                const movementKeys = [87,65,83,68];

                if (!gameOver && movementKeys.includes(e.keyCode)) {

                    steps++;
                    window.currentSteps = steps;

                    stepCounterEl.textContent = "Steps: " + steps + " / " + STEP_GOAL;

                    if (steps > STEP_GOAL * 0.75) {
                        stepCounterEl.style.background = "rgba(200,0,0,0.7)";
                    }

                    if (steps > STEP_GOAL) {
                        message.textContent = "You didn't make it to Garrett in time!";
                        fade.style.opacity = "1";
                        gameOver = true;
                    }
                }

                // 🔄 RESTART
                if (gameOver && e.keyCode === 82) {

                    if (playerRef) {
                        playerRef.position.x = playerData.INIT_POSITION.x;
                        playerRef.position.y = playerData.INIT_POSITION.y;
                    }

                    steps = 0;
                    window.currentSteps = 0;
                    stepCounterEl.textContent = "Steps: 0 / " + STEP_GOAL;
                    stepCounterEl.style.background = "rgba(0,0,0,0.6)";

                    fade.style.opacity = "0";
                    gameOver = false;
                }
            });

        });

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            ...wallClasses
        ];
    }
}

export default GameLevelTimmyfuncounter;