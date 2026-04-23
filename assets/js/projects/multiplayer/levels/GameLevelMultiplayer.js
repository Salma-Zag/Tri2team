// Adventure Game Custom Level
// Exported from GameBuilder on 2026-03-05T17:15:10.295Z
// How to use this file:
// 1) Save as assets/js/adventureGame/GameLevelTimmy.js in your repo.
// 2) Reference it in your runner or level selector. Examples:
//    import GameLevelPlanets from '/assets/js/GameEnginev1/GameLevelPlanets.js';
//    import GameLevelTimmy from '/assets/js/adventureGame/GameLevelTimmy.js';
//    export const gameLevelClasses = [GameLevelPlanets, GameLevelTimmy];
//    // or pass it directly to your GameControl as the only level.
// 3) Ensure images exist and paths resolve via 'path' provided by the engine.
// 4) You can add more objects to this.classes inside the constructor.

import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
class GameLevelMultiplayer {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;
        // const socket = io("wss://flask-ws.opencodingsociety.com", { transports: ["websocket"] });
        const socket = io("ws://localhost:8590", { transports: ["websocket"] });
        
        let myid = null;

        socket.on("connect", () => {
            console.log("connected:", socket.id);
            myid = socket.id;
        });

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/blackandwhite.jpg",
            pixels: { height: 720, width: 1280 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 700, y: 300 },
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
        this.classes = [      { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
        ];

                
            }
        }
 
export default GameLevelMultiplayer;