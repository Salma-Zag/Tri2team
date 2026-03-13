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
            hitbox: { widthPercentage: 0, heightPercentage: 0 },
            keypress: { up: 38, left: 37, down: 40, right: 39 }
        };

        const npcData1 = {
            id: 'Garret',
            greeting: '"Good luck! You will need it...',
            src: path + "/images/gamebuilder/sprites/Garret2.png",
            SCALE_FACTOR: 4,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 60, y: 278 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: ['"Good luck! You will need it...'],
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
        };

        const stepCounterEl = document.createElement('div');
        stepCounterEl.id = 'stepCounter';
        stepCounterEl.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            color: white;
            font-size: 24px;
            font-family: Arial, sans-serif;
            background: rgba(0,0,0,0.5);
            padding: 8px 16px;
            border-radius: 8px;
            z-index: 9999;
        `;
        stepCounterEl.textContent = 'Steps: 0';
        document.body.appendChild(stepCounterEl);

        let steps = 0;
        document.addEventListener('keydown', function(e) {
            if ([87, 65, 83, 68].includes(e.keyCode)) {
                steps++;
                stepCounterEl.textContent = 'Steps: ' + steps;
            }
        });

        // FRAME BORDER BARRIERS :D
        const frameBorderLeft = {
            id: 'frameBorderLeft', x: 0, y: 0, width: 78, height: 12, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const frameBorderRight = {
            id: 'frameBorderRight', x: 1132, y: 0, width: 100, height: 720, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const frameBorderTop = {
            id: 'frameBorderTop', x: 0, y: 0, width: 1280, height: 78, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const frameBorderBottom = {
            id: 'frameBorderBottom', x: 0, y: 642, width: 1280, height: 78, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Barrier, data: frameBorderLeft },
            { class: Barrier, data: frameBorderRight },
            { class: Barrier, data: frameBorderTop },
            { class: Barrier, data: frameBorderBottom },
        ];
    }
}

export default GameLevelTimmyfuncounter;