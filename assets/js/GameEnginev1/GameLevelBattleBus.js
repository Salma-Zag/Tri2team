import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

class GameLevelBattleBus {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        // --- GLOBAL TELEPORT LOGIC ---
        window.onkeydown = (e) => {
            if (e.key.toLowerCase() === 'g') {
                const player = gameEnv.gameObjects.find(obj => obj.spriteData && obj.spriteData.id === 'playerData');
                if (player) {
                    player.x = width - 200; // Snap to the right side
                }
            }
        };

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/HellWithTravelSign.png",
            pixels: { height: 400, width: 700 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 8,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 100, y: 500 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            down: { row: 0, start: 0, columns: 3 },
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 0, start: 0, columns: 3 },
            up: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0, heightPercentage: 0 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        const npcData1 = {
            id: 'cat',
            greeting: "Mrow. Solve my riddle to earn passage.",
            src: path + "/images/gamebuilder/sprites/CatOnHellThrone.png",
            SCALE_FACTOR: 3,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 470, y: 450 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },
            interact: function() {
                if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) return;

                if (this.dialogueSystem) {
                    const riddle = "I have keys, but no locks. I have a space, but no room. You can allow entry, but you can never leave. What am I? (Hint: use all lower case)";
                    this.dialogueSystem.showDialogue(riddle, "The Cat", this.spriteData.src);

                    const inputContainer = document.createElement('div');
                    inputContainer.style.marginTop = '10px';
                    inputContainer.style.display = 'flex';
                    inputContainer.style.gap = '5px';

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.placeholder = 'Type answer...';
                    input.style.padding = '5px';
                    input.style.color = 'white'; 
                    input.style.background = 'rgba(0, 0, 0, 0.6)';
                    input.style.border = '1px solid white';

                    input.addEventListener('keydown', (e) => {
                        e.stopPropagation(); 
                        if (e.key === 'Enter') checkAnswer();
                    });

                    const submitBtn = document.createElement('button');
                    submitBtn.textContent = 'Submit';
                    submitBtn.style.padding = '5px 10px';
                    submitBtn.style.background = '#e84a7c';
                    submitBtn.style.color = 'white';

                    const checkAnswer = () => {
                        const answer = input.value.trim().toLowerCase();
                        if (answer === "keyboard") {
                            this.dialogueSystem.closeDialogue();
                            
                            const bus = gameEnv.gameObjects.find(obj => obj.canvas && obj.canvas.id === 'Battle Bus');
                            if (bus) {
                                bus.y = 200; 
                                bus.canvas.style.opacity = '1';
                                bus.canvas.style.display = 'block';
                            }

                            const player = gameEnv.gameObjects.find(obj => obj.spriteData && obj.spriteData.id === 'playerData');
                            if (player) {
                                player.x = width - 200;
                            }

                            alert("Correct! You have been teleported to the Battle Bus!");
                        } else {
                            alert("Wrong! Try again.");
                            input.value = "";
                        }
                    };

                    submitBtn.onclick = checkAnswer;
                    inputContainer.appendChild(input);
                    inputContainer.appendChild(submitBtn);

                    const dialogueBox = document.getElementById('custom-dialogue-box-' + this.dialogueSystem.id);
                    if (dialogueBox) {
                        dialogueBox.appendChild(inputContainer);
                        setTimeout(() => input.focus(), 50);
                    }
                }
            }
        };

        const npcData3 = {
            id: 'Battle Bus',
            greeting: "All aboard!",
            src: path + "/images/gamebuilder/sprites/battlebus.png",
            SCALE_FACTOR: 1,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: width - 700, y: -2000 }, 
            pixels: { height: 700, width: 700 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.6, heightPercentage: 0.6 },
            postInit: function() {
                if (this.canvas) {
                    this.canvas.style.opacity = '0'; 
                }
            },
            interact: function() {
                window.location.href = "battlebusone.html"; 
            }
        };

        const hellTravelData = {
            id: 'hellTravel',
            greeting: "BEHOLD THE PASSAGE.",
            src: path + "/images/gamebuilder/sprites/helltravel.png",
            SCALE_FACTOR: 15, 
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: width * 0.75, y: height * 0.20 },
            pixels: { height: 512, width: 512 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.5, heightPercentage: 0.5 }
        };

        // Barrier data removed from the classes array below to make it non-existent.
        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Npc, data: npcData3 },
            { class: Npc, data: hellTravelData }
        ];
    }
}

export default GameLevelBattleBus;