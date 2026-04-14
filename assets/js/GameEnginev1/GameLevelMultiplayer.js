// Adventure Game Custom Level
// Exported and Fixed for GameBuilder
// How to use this file:
// 1) Save as assets/js/adventureGame/GameLevelGamelevelmultiplayer.js in your repo.
// 2) Reference it in your runner or level selector.

import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';

class GameLevelMultiplayer {
    constructor(gameEnv) {
        const path = gameEnv.path;
        console.log("Loading Background from:", path + "/images/gamebuilder/bg/blackandwhite.jpg");

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/blackandwhite.jpg",
            pixels: { height: 772, width: 1134 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 5,
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

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData }
        ];
    }
}

export default GameLevelMultiplayer;