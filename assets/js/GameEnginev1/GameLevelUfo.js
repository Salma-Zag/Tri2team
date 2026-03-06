import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

class GameLevelUfo {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/alien_planet.jpg",
            pixels: { height: 772, width: 1134 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/pew.png",
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 100, y: 300 },
            pixels: { height: 320, width: 320 },
            orientation: { rows: 4, columns: 4 },
            down: { row: 0, start: 0, columns: 3 },
            downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
            downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },
            upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
            upRight: { row: 3, start: 0, columns: 3, rotate: -Math.PI/16 },
            hitbox: { widthPercentage: 0, heightPercentage: 0 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
            };

        const npcData1 = {
            id: 'astro',
            greeting: 'Hi there! We\'re on the moon!',
            src: path + "/images/gamebuilder/sprites/astro.png",
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 332, y: 113 },
            pixels: { height: 770, width: 513 },
            orientation: { rows: 4, columns: 4 },
            down: { row: 0, start: 0, columns: 3 },
            right: { row: Math.min(1, 4 - 1), start: 0, columns: 3 },
            left: { row: Math.min(2, 4 - 1), start: 0, columns: 3 },
            up: { row: Math.min(3, 4 - 1), start: 0, columns: 3 },
            upRight: { row: Math.min(3, 4 - 1), start: 0, columns: 3 },
            downRight: { row: Math.min(1, 4 - 1), start: 0, columns: 3 },
            upLeft: { row: Math.min(2, 4 - 1), start: 0, columns: 3 },
            downLeft: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: ['Hi there! We\'re on the moon!'],
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } },
            xVelocity: 1,  // Move right at 1 pixel per frame (adjust as needed)
            yVelocity: 0
        };

        // Add two more moving NPCs
        const npcData2 = {
            id: 'ufo1',
            greeting: 'Beep boop!',
            src: path + "/images/gamebuilder/sprites/ufo.png",  // Assuming this image exists; replace if needed
            SCALE_FACTOR: 6,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 600, y: 200 },
            pixels: { height: 320, width: 320 },
            orientation: { rows: 1, columns: 1 },  // Simple sprite
            hitbox: { widthPercentage: 0.5, heightPercentage: 0.5 },
            dialogues: ['Beep boop!'],
            reaction: function() { console.log(this.greeting); },
            interact: function() { console.log('Interacting with UFO!'); },
            xVelocity: -2,  // Move left
            yVelocity: 0
        };

        const npcData3 = {
            id: 'shootingstar',
            greeting: 'wee!',
            src: path + "/images/gamebuilder/sprites/shootingstar.png",
            SCALE_FACTOR: 7,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 800, y: 400 },
            pixels: { height: 512, width: 384 },
            orientation: { rows: 4, columns: 3 },
            down: { row: 0, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            left: { row: 2, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.3 },
            dialogues: ['Greetings, earthling!'],
            reaction: function() { console.log(this.greeting); },
            interact: function() { console.log('Alien says hi!'); },
            xVelocity: 1.5,  // Move right at 1.5 pixels per frame
            yVelocity: 0
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Npc, data: npcData2 },
            { class: Npc, data: npcData3 }
        ];

        // Add update method for indefinite movement (assumes the GameEngine calls update on the level)
        this.update = function(deltaTime) {
            this.classes.forEach(obj => {
                if (obj.instance && obj.instance.xVelocity !== undefined) {
                    obj.instance.x += obj.instance.xVelocity * (deltaTime / 16.67);  // Normalize to ~60 FPS
                    obj.instance.y += obj.instance.yVelocity * (deltaTime / 16.67);
                    // Wrap around screen for indefinite movement
                    if (obj.instance.x > width + 100) obj.instance.x = -100;
                    if (obj.instance.x < -100) obj.instance.x = width + 100;
                    // Optional: Bounce vertically if yVelocity is set
                    if (obj.instance.y > height - 100 || obj.instance.y < 100) obj.instance.yVelocity *= -1;
                }
            });
        };
    }
}