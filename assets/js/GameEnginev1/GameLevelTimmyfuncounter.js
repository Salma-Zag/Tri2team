/**
 * @file GameLevelTimmyfuncounter.js
 * @description Timmy's Fun World - An invisible maze level where Kirby navigates
 * through hidden barriers while a step counter tracks every move made.
 * The interaction occurs in the game loop via a keydown event listener that
 * updates the DOM step counter each time an arrow key is pressed.
 */

import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';
import Barrier from '/assets/js/GameEnginev1/essentials/Barrier.js';

class GameLevelTimmyfuncounter {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        /**
         * @property {Object} bgData - Background configuration
         * @description Sets the cloud sky environment for the level.
         * A bright open sky scene that contrasts with the hidden maze below.
         */
        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/clouds.jpg",
            pixels: { height: 720, width: 1280 }
        };

        /**
         * @property {Object} playerData - Player (Kirby) configuration
         * @description The user-controlled character. Kirby starts on the left
         * side of the screen and moves using arrow keys. SCALE_FACTOR of 8
         * makes Kirby large enough to see clearly while navigating the maze.
         * Each keypress triggers the step counter interaction.
         */
        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 8,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 100, y: 300 },
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

        /**
         * @property {Object} npcData1 - NPC (Random Guy) configuration
         * @description A Tux penguin NPC positioned at the entry point of the maze.
         * Acts as the guide who warns the player about the invisible maze ahead.
         * SCALE_FACTOR of 9 makes him large and immediately visible at game start.
         * Triggers dialogue interaction when the player approaches.
         */
        const npcData1 = {
            id: 'Random Guy',
            greeting: '"Welcome to the invisible maze...good luck!',
            src: path + "/images/gamify/tux.png",
            SCALE_FACTOR: 9,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: 300 },
            pixels: { height: 256, width: 352 },
            orientation: { rows: 8, columns: 11 },
            down: { row: 0, start: 0, columns: 3 },
            right: { row: Math.min(1, 8 - 1), start: 0, columns: 3 },
            left: { row: Math.min(2, 8 - 1), start: 0, columns: 3 },
            up: { row: Math.min(3, 8 - 1), start: 0, columns: 3 },
            upRight: { row: Math.min(3, 8 - 1), start: 0, columns: 3 },
            downRight: { row: Math.min(1, 8 - 1), start: 0, columns: 3 },
            upLeft: { row: Math.min(2, 8 - 1), start: 0, columns: 3 },
            downLeft: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: ['"Welcome to the invisible maze...good luck!'],
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
        };

        /**
         * @description Step Counter Interaction - FA2 Core Feature
         * Creates a DOM element that tracks and displays Kirby's moves on screen.
         * INTERACTION: keydown event fires on every arrow key press
         * REACTION: step counter increments and DOM updates in real time
         * This interaction occurs outside the game loop but responds to the
         * same input events that drive player movement in the game loop.
         */
        const stepCounterEl = document.createElement('div');
        stepCounterEl.id = 'stepCounter';
        stepCounterEl.style.cssText = `
            position: fixed;
            top: 20px;
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
            if ([37, 38, 39, 40].includes(e.keyCode)) {
                steps++;
                stepCounterEl.textContent = 'Steps: ' + steps;
            }
        });

        /**
         * @description Barrier definitions - the invisible maze walls
         * All barriers set to visible: false to create the hidden maze mechanic.
         * Players must discover paths through exploration, tracked by the step counter.
         */
        const dbarrier_1 = {
            id: 'dbarrier_1', x: 267, y: 251, width: 5, height: 97, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_2 = {
            id: 'dbarrier_2', x: 395, y: 81, width: 179, height: 6, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_3 = {
            id: 'dbarrier_3', x: 401, y: 84, width: 8, height: 180, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_4 = {
            id: 'dbarrier_4', x: 507, y: 164, width: 138, height: 6, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_5 = {
            id: 'dbarrier_5', x: 519, y: 248, width: 6, height: 126, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_6 = {
            id: 'dbarrier_6', x: 5, y: 232, width: 165, height: 8, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_7 = {
            id: 'dbarrier_7', x: 259, y: 8, width: 7, height: 170, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_8 = {
            id: 'dbarrier_8', x: 125, y: 132, width: 5, height: 108, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_9 = {
            id: 'dbarrier_9', x: 3, y: 71, width: 63, height: 7, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_10 = {
            id: 'dbarrier_10', x: 361, y: 335, width: 8, height: 78, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_11 = {
            id: 'dbarrier_11', x: 3, y: 57, width: 4, height: 4, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        const dbarrier_12 = {
            id: 'dbarrier_12', x: 120, y: 124, width: 19, height: 72, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Barrier, data: dbarrier_1 },
            { class: Barrier, data: dbarrier_2 },
            { class: Barrier, data: dbarrier_3 },
            { class: Barrier, data: dbarrier_4 },
            { class: Barrier, data: dbarrier_5 },
            { class: Barrier, data: dbarrier_6 },
            { class: Barrier, data: dbarrier_7 },
            { class: Barrier, data: dbarrier_8 },
            { class: Barrier, data: dbarrier_9 },
            { class: Barrier, data: dbarrier_10 },
            { class: Barrier, data: dbarrier_11 },
            { class: Barrier, data: dbarrier_12 }
        ];
    }
}

export default GameLevelTimmyfuncounter;