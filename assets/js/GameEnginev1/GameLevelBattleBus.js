// Adventure Game Custom Level
// Exported from GameBuilder on 2026-03-10T15:44:57.650Z
// How to use this file:
// 1) Save as assets/js/adventureGame/GameLevelBattleBus.js in your repo.
// 2) Reference it in your runner or level selector. Examples:
//    import GameLevelPlanets from '/assets/js/GameEnginev1/GameLevelPlanets.js';
//    import GameLevelBattleBus from '/assets/js/adventureGame/GameLevelBattleBus.js';
//    export const gameLevelClasses = [GameLevelPlanets, GameLevelBattleBus];
//    // or pass it directly to your GameControl as the only level.
// 3) Ensure images exist and paths resolve via 'path' provided by the engine.
// 4) You can add more objects to this.classes inside the constructor.

import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

class GameLevelBattleBus {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/Hell.png",
            pixels: { height: 400, width:700 }
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
            keypress: { up: 87, left: 65, down: 83, right: 68 }
            };
            
        const npcData1 = {
            id: 'cat',
            greeting: "battle battle bus bus",
            src: path + "/images/gamebuilder/sprites/CatOnHellThrone.png",
            SCALE_FACTOR: 2,
            ANITION_RATE: 50,
            INIT_POSITION: { x: 350, y: 300 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
            dialogues: [
            ],
            reaction: function() {
           // Use dialogue system instead of alert
           if (this.dialogueSystem) {
               this.showReactionDialogue();
           } else {
               console.log(sprite_greet_crypto);
           }
       },
       interact: function() {
           // Clear any existing dialogue first
           if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
               this.dialogueSystem.closeDialogue();
           }

           const showNextDialogue = (text) => {
                if (this.dialogueSystem.isDialogueOpen()) {
                    this.dialogueSystem.closeDialogue();
                }

                setTimeout(() => {
                    this.dialogueSystem.showDialogue(
                    text,
                    "The Boss's Pet Cat",
                    this.spriteData.src
                    );
                }, 0);
            };
          
           // Show a dialogue with buttons immediately
           if (this.dialogueSystem) {
               // Get a random dialogue message if available
               let message = "What kind of cheese is the moon made of?";
               if (this.spriteData.dialogues && this.spriteData.dialogues.length > 0) {
                   const randomIndex = Math.floor(Math.random() * this.spriteData.dialogues.length);
                   message = this.spriteData.dialogues[randomIndex];
               }
              
               this.dialogueSystem.showDialogue(
                   message,
                   "The Boss's Pet Cat",
                   this.spriteData.src
               );
              
               // Create the buttons container
               const buttonContainer = document.createElement('div');
               buttonContainer.style.display = 'flex';
               buttonContainer.style.justifyContent = 'space-between';
               buttonContainer.style.marginTop = '10px';
              
               // Create the Yes button
               const yesButton = document.createElement('button');
               yesButton.textContent = "Swiss";
               yesButton.style.padding = '8px 15px';
               yesButton.style.background = '#e84a7c';
               yesButton.style.color = 'white';
               yesButton.style.border = 'none';
               yesButton.style.borderRadius = '5px';
               yesButton.style.cursor = 'pointer';
               yesButton.style.marginRight = '10px';

               const cheeseButton = document.createElement('button');
               cheeseButton.textContent = "Cheddar";
               cheeseButton.style.padding = '8px 15px';
               cheeseButton.style.background = '#e84a7c';
               cheeseButton.style.color = 'white';
               cheeseButton.style.border = 'none';
               cheeseButton.style.borderRadius = '5px';
               cheeseButton.style.cursor = 'pointer';
               cheeseButton.style.marginRight = '10px';
              
               // Create the No button
               const noButton = document.createElement('button');
               noButton.textContent = "It's not";
               noButton.style.padding = '8px 15px';
               noButton.style.background = '#e84a7c';
               noButton.style.color = 'white';
               noButton.style.border = 'none';
               noButton.style.borderRadius = '5px';
               noButton.style.cursor = 'pointer';
              
               // Add button functionality
               yesButton.onclick = () => {
                   showNextDialogue("Wrong. You're not worthy of seeing the boss.");
               };

               cheeseButton.onclick = () => {
                   showNextDialogue("Wrong. You're not worthy of seeing the boss.");
               };
              
               noButton.onclick = () => {
                 this.dialogueSystem.closeDialogue();
                 setTimeout(() => {
                    window.location.href = "battlebustwo.html";
                }, 200);
            };
            
              
               // Add buttons to container
               buttonContainer.appendChild(yesButton);
               buttonContainer.appendChild(cheeseButton);
               buttonContainer.appendChild(noButton);
              
               // Add buttons to dialogue box RIGHT AWAY (no setTimeout)
               const dialogueBox = document.getElementById('custom-dialogue-box-' + this.dialogueSystem.id);
               if (dialogueBox) {
                   // Find the close button to insert before it
                   const closeBtn = dialogueBox.querySelector('button');
                   if (closeBtn) {
                       dialogueBox.insertBefore(buttonContainer, closeBtn);
                   } else {
                       dialogueBox.appendChild(buttonContainer);
                   }
               }
           } else {
               // Original functionality as fallback
               const confirmTeleport = window.confirm("Teleport to gambling hub?");
               if (confirmTeleport) {
                   window.location.href = "https://pages.opencodingsociety.com/gamify/casinohomepage";
               }
           }
       }

        };
        const npcData3 = {
            id: 'Battle Bus',
            greeting: '"Press E to hop on!"',
            src: path + "/images/gamebuilder/sprites/battlebus.png",
            SCALE_FACTOR: 1,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 1300, y: 500 },
            pixels: { height: 700, width: 700 },
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
        window.location.href = "battlebustwo.html";
      }
    });
  }
}
        }      
const dbarrier_1 = {
    id: 'dbarrier_1', x: 0, y: 0, width: 504, height: 109, visible: false,
    hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
    fromOverlay: true
};
this.classes = [      { class: GameEnvBackground, data: bgData },
      { class: Player, data: playerData },
      { class: Npc, data: npcData1 },
      { class: Npc, data: npcData3 },
      { class: Barrier, data: dbarrier_1 }
];

        
    }
}

export default GameLevelBattleBus;