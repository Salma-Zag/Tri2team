import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

class GameLevelTimmyfuncounter {
    constructor(gameEnv) {
        this.gameEnv = gameEnv;
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
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 0, start: 0, columns: 3 },
            up: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };
        

        // Audio setup
        const music = new Audio(path + "/assets/audio/SubwaySurfers.mp3");
        music.loop = true;
        music.volume = 0.8;

        const npcData3 = {
            id: 'Popcorn',
            greeting: '"You won!"',
            src: path + "/images/gamebuilder/sprites/doorpopcorn.png",
            SCALE_FACTOR: 4,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 1000, y: 100 },
            pixels: { height: 400, width: 430 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
            dialogues: [
  ],

    interact: function() { 
        if (this.dialogueSystem) { 
            this.showRandomDialogue(); 
    }
        if (!this.listenerAdded) {
    this.listenerAdded = true; 
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "e") {
        console.log("Entering maze...");
        window.location.href = "battlebusone.html";
      }
    });
  }
}
        }   

        const npcData1 = {
            id: 'Garret',
            greeting: '"Catch me if you can!"',
            src: path + "/images/gamebuilder/sprites/Garret2.png",
            SCALE_FACTOR: 4,
            ANIMATION_RATE: 50,
            // Garrett starts on the right side of the screen
            INIT_POSITION: { x: width - 250, y: height / 2 }, 
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.6 },
            dialogues: ['"Good luck! You will need it..."'],
            interact: function() {
                // Winning/Losing logic when the player reaches Garrett
                if (window.currentSteps <= window.stepGoal) {
                    window.hoorayLevelRef.saveToLeaderboard(window.currentSteps);
                    alert(`🎉 SUCCESS! You caught Garrett in ${window.currentSteps} steps! Use the popcorn to leave.`);
                } else {
                    alert(`TOO SLOW! You took ${window.currentSteps} steps. Try to stay under ${window.stepGoal}!`);
                }
            }
        };

        

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
            data: { id: "wall_" + Math.random(), x: wall.x, y: wall.y, width: wall.width, height: wall.height, visible: false }
        }));

        // Handles logic as soon as the browser loads the level
        window.addEventListener("load", () => {
            // 1. Browser Alert - This acts as the "user interaction" needed to play audio
            alert("Catch me if you can! -Garrett");

            // 2. Play music immediately after clicking 'OK'
            music.play().catch(err => console.log("Audio waiting for interaction:", err));

            const STEP_GOAL = 300;
            window.currentSteps = 0;
            window.stepGoal = STEP_GOAL;

            this.createLeaderboardUI();

            const hud = document.createElement("div");
            hud.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); z-index:10000;";
            document.body.appendChild(hud);

            const stepCounterEl = document.createElement("div");
            stepCounterEl.style.cssText = "color:white; font-size:26px; font-family:Arial; background:rgba(0,0,0,0.85); padding:10px 18px; border-radius:10px; border: 2px solid #ffd700;";
            stepCounterEl.textContent = "Steps: 0 / " + STEP_GOAL;
            hud.appendChild(stepCounterEl);

            document.addEventListener("keydown", (e) => {
                const movementKeys = [87, 65, 83, 68];
                if (movementKeys.includes(e.keyCode)) {
                    window.currentSteps++;
                    stepCounterEl.textContent = `Steps: ${window.currentSteps} / ${STEP_GOAL}`;
                    
                    if (window.currentSteps > STEP_GOAL * 0.8) {
                        stepCounterEl.style.color = "#ff4d4d";
                    }
                }
            });
        });

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData3 },
            { class: Npc, data: npcData1 },
            ...wallClasses
        ];

        window.hoorayLevelRef = this;
    }

    createLeaderboardUI() {
        const btn = document.createElement("button");
        btn.textContent = "🏆 Records";
        btn.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:10001; padding:10px; cursor:pointer; background:#ffd700; border:2px solid black; border-radius:5px; font-weight:bold;";
        document.body.appendChild(btn);

        const panel = document.createElement("div");
        panel.id = "leaderboard-panel";
        panel.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:320px; background:rgba(10,10,10,0.95); color:white; padding:20px; border-radius:15px; display:none; z-index:10002; font-family:Arial; border:3px solid #ffd700; text-align:center;";
        document.body.appendChild(panel);

        btn.onclick = () => {
            if (panel.style.display === "none") {
                this.updateLeaderboardDisplay();
                panel.style.display = "block";
            } else {
                panel.style.display = "none";
            }
        };
    }

    saveToLeaderboard(steps) {
        let scores = JSON.parse(localStorage.getItem("mazeScores")) || [];
        scores.push({ steps: steps, date: new Date().toLocaleTimeString() });
        scores.sort((a, b) => a.steps - b.steps);
        scores = scores.slice(0, 5); 
        localStorage.setItem("mazeScores", JSON.stringify(scores));
    }

    updateLeaderboardDisplay() {
        const panel = document.getElementById("leaderboard-panel");
        const scores = JSON.parse(localStorage.getItem("mazeScores")) || [];
        let html = "<h2 style='color:#ffd700;'>🏆 Top 5 Runs</h2><hr style='border-color:#ffd700;'>";
        
        if (scores.length === 0) {
            html += "<p>No winners yet. Catch Garrett!</p>";
        } else {
            scores.forEach((s, i) => {
                html += `<p style='font-size:18px;'>${i + 1}. <b>${s.steps} steps</b> <br><small style='opacity:0.6;'>${s.date}</small></p>`;
            });
        }
        // yay
        html += "<br><button id='close-lb' style='padding:8px 20px; cursor:pointer; background:white; border-radius:5px; border:none; font-weight:bold;'>Close</button>";
        panel.innerHTML = html;
        document.getElementById("close-lb").onclick = () => panel.style.display = "none";
    }
}

export default GameLevelTimmyfuncounter;