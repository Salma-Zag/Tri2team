//Add notes bruh (ADD NOTES IN GREEN SO I CAN LOOK BACK LATER)
// I am assuming this is assessment two. We have to present on the local host because the github thingy is broken

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
            INIT_POSITION: { x: 300, y: 300 },
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

        const npcData1 = {
            id: 'Garret',
            greeting: '"Good luck! You will need it..."',
            src: path + "/images/gamebuilder/sprites/Garret2.png",
            SCALE_FACTOR: 4,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 60, y: 278 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },

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
        window.addEventListener("load", () => {

            const STEP_GOAL = 120;

            window.currentSteps = 0;
            window.stepGoal = STEP_GOAL;

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

            document.addEventListener("keydown", (e) => {

                const movementKeys = [87,65,83,68];
                if (movementKeys.includes(e.keyCode)) {

                    steps++;
                    window.currentSteps = steps;

                    stepCounterEl.textContent = "Steps: " + steps + " / " + STEP_GOAL;
                    if (steps > STEP_GOAL * 0.75) {
                        stepCounterEl.style.background = "rgba(200,0,0,0.7)";
                    }

                }

            });

        });


        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 }
        ];
    }
}

export default GameLevelTimmyfuncounter;