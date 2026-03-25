---
layout: post 
title: Timmy123's Crash Landing Blog
permalink: /Athreeblog
hide: true
show_reading_time: false
---
By Salma Zaghloul and Sophie Haas
checklist: [https://pages.opencodingsociety.com/csse/sprint6/objectives](url)

- [x] Writing Classes
- Create minimum 2 custom character classes extending base classes 
- Code review: Player.js, NPC.js, Enemy.js,

> Level 1: Character Classes
```.js
const npcData1 = {
            id: 'Garrett The Popcorn Man',
            greeting: 'Hi! I\'m Garrett!',
            src: path + "/images/gamebuilder/sprites/GarettThePopcornMan.png",
            SCALE_FACTOR: 1,
            ANITION_RATE: 50,
            INIT_POSITION: { x: 650, y: 540 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: [
                "Welcome to Timmy's Fun World! I'm Garrett! Oh, and by the way, be wary of that circus tent, the Invisible Maze lies within...  Want some popcorn?",
            ],
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
}
```
```.js
const npcData2 = {
            id: 'Timmy Sign',
            greeting: 'Hi!',
            src: path + "/images/gamebuilder/sprites/TimmySign.png",
            SCALE_FACTOR: 2,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 400, y: 70 },
            pixels: { height: 400, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 1.0, heightPercentage: 0.5 },
            dialogues: [
                "It's an old, makeshift sign. Seems unprofessional.",
            ],
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
```
- [ ] Methods & Parameters
- Implement methods with parameters (e.g., collisionHandler(other, direction)) 
- Code review: Method signatures with 2+ parameters

> 

- [x] Instantiation & Objects
- Instantiate game objects in GameLevel configuration
- Code review: GameLevel setup objects

> Level 1: The constructer creates data objects

```.js
this.classes = [
    { class: GameEnvBackground, data: bgData },
    { class: Player, data: playerData },
    { class: Npc, data: npcData1 },
    // ...
];
```

- [x] Inheritance (Basic)
- Create class hierarchy with 2+ levels (e.g., GameObject → Character → Player)
- Code review: extends keyword, inheritance chain
```js
class Player extends Character {
    // Static counter for unique player IDs (uninitialized)
    static playerCount;
```
```js
class Garrett extends Enemy {
// and so on...
```
- [x] Method Overriding
- Override parent methods (update(), draw(), handleCollision())
- Code review: Polymorphic implementations
```js

    interact: function() { 
        if (this.dialogueSystem) { 
            this.showRandomDialogue(); 
    }
        if (!this.listenerAdded) {
    this.listenerAdded = true; 
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "e") {
        console.log("Entering maze...");
        window.location.href = "timmycounter.html";
      }
    });
  }
}
```
Or additionally
```js
 update() {
        super.update();
        if(!this.moved){
            if (this.gravity) {
                    this.time += 1;
                    this.velocity.y += 0.5 + this.acceleration * this.time;
                }
            }
        else{
            this.time = 0;
        }
        }
```
We utilize the gravity.
- [x] Constructor Chaining
- Use super() to chain constructors
- Code review: super(data, gameEnv) calls
```js
constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.interact = data?.interact; // Interact function
        this.currentQuestionIndex = 0;
        this.alertTimeout = null;
        this.isInteracting = false; // Flag to track if currently interacting
        this.handleKeyDownBound = this.handleKeyDown.bind(this);
        this.handleKeyUpBound = this.handleKeyUp.bind(this);
        this.bindInteractKeyListeners();
```
### Live Demo
{% include js-runner.html
runner_id="constructor_chain_game"
code='
class GameObject {
  constructor(data) {
    this.id = data.id;
    console.log("GameObject created:", this.id);
  }
}

class Npc extends GameObject {
  constructor(data) {
    super(data); // chaining
    this.dialogues = data.dialogues;
    console.log("Npc created with dialogue");
  }
}

const npcData = {
  id: "Garrett",
  dialogues: ["Welcome to Timmy\\'s Fun World!"]
};

new Npc(npcData);
'
%}
### CONTROL STRUCTURES
- [x] Iteration
- Use loops for game object arrays, animation frames
- Code review: for, forEach, while loops

> Level 1: Wall Classes

```.js
const wallClasses = mazeWalls.map(wall => ({ ... }));
```
- [x] Conditionals
- Implement collision detection, state transitions
- Code review: if/else, nested conditions

> Level 2: Message
```.js
if (steps > STEP_GOAL) {
message.textContent = "You didn't make it...";
gameOver = true;
}
```

- [x] Nested Conditions
- Complex game logic (e.g., power-up + collision + direction)
- Code review: Multi-level conditionals

> Level 2: Teleporting Garrett
```.js
reaction: function() {
    if (!this.teleported) return; // Level 1
    if (window.currentSteps <= window.stepGoal) { // Level 2
        alert("Win");
    } else {
        alert("Loss");
    }
}
```

### DATA TYPES
- [x] Numbers
- Position, velocity, score tracking
- Code review: Numeric properties
> Level 2: Step Counter
```.js
const STEP_GOAL = 200;
steps++;
- [x] Strings
- Character names, sprite paths, game states
- Code review: String manipulation
> Level 2: Message
```.js
message.textContent = "You didn't make it to Garrett in time!";
window.location.href = "timmycounter.html";
```
- [x] Booleans
- Flags (isJumping, isPaused, isVulnerable)
- Code review: Boolean logic

> Level 2: Music!
```.js
let musicStarted = false;
let gameOver = false;
this.teleported = true;
```
- [x] Arrays
- Game object collections, level data
- Code review: Array operations

> Level 1: Player Data

```.js
this.classes = [      { class: GameEnvBackground, data: bgData },
      { class: Player, data: playerData },
      { class: Npc, data: npcData1 },
      { class: Npc, data: npcData2 },
      { class: Npc, data: npcData3 },
      { class: Barrier, data: dbarrier_1 }
];

];
```
- [x] Objects (JSON)
- Configuration objects, sprite data
- Code review: Object literals

> Level 1: Any NPC or Player data, EX is from Garrett's data
```.js
const npcData1 = {
            id: 'Garrett The Popcorn Man',
            greeting: 'Hi! I\'m Garrett!',
            src: path + "/images/gamebuilder/sprites/GarettThePopcornMan.png",
            SCALE_FACTOR: 1,
            ANITION_RATE: 50,
            INIT_POSITION: { x: 650, y: 540 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: [
                "Welcome to Timmy's Fun World! I'm Garrett! Oh, and by the way, be wary of that circus tent, the Invisible Maze lies within...  Want some popcorn?",
            ],
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
        };
```
### OPERATORS
- [x] Mathematical
- Physics calculations (gravity, velocity, collision)
- Code review: +, -, *, / in physics

> Level 2: Step Counter

```.js
window.addEventListener("load",` () => {

            const STEP_GOAL = 200;

            window.currentSteps = 0;
            window.stepGoal = STEP_GOAL;
```
```.js
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
```
- [x] String Operations
- Path concatenation, text display
- Code review: Template literals, concatenation

> Level 1: Background Paths
```.js
src: path + "/images/gamebuilder/sprites/kirby.png",
src: path + "/images/gamebuilder/bg/TimmyGreatBg.png",
```
```.js
stepCounterEl.textContent = "Steps: " + steps + " / " + STEP_GOAL;
```
- [x] Boolean Expressions
- Compound conditions in game logic
- Code review: &&, ||, !

> Level 1/2: Game Logic
```.js
if (gameOver && e.keyCode === 82) {
    steps = 0;
```
```.js
if (!this.listenerAdded) {
    this.listenerAdded = true;
    // ... logic
}

// From GameLevelTimmyfuncounter.js
if (!musicStarted) {
    music.play();
    musicStarted = true;
}
```

###  INPUT/OUTPUT
- [x] Keyboard Input
- Arrow keys, space, WASD controls using event listeners
- Testing: Key event handlers respond correctly
```.js
setTimeout(() => {
                playerRef = gameEnv.gameObjects.find(obj => obj.id === 'playerData');
            }, 500);

            document.addEventListener("keydown", (e) => {

                const movementKeys = [87,65,83,68];
                if (movementKeys.includes(e.keyCode)) {

                    steps++;
                    window.currentSteps = steps;
```
- [ ] Canvas Rendering
- Draw sprites, backgrounds, platforms using Canvas API
- Code review: draw() method implementations
- [x] GameEnv Configuration
- Set canvas size, difficulty levels, game settings
- Code review: GameEnv.create() and GameSetup.js

> Level 1/2: Canvas Sizes

```.js
constructor(gameEnv) {
    const path = gameEnv.path;
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;
```
- [ ] API Integration
- Implement Leaderboard API (POST/GET scores)
- Code review: Fetch calls with error handling
- [ ] Asynchronous I/O
- Use async/await or promises for API calls
- Code review: async/await or .then() chains
- [ ] JSON Parsing
- Parse API responses (leaderboard data, AI responses)
- Code review: JSON.parse(), object destructuring
### DOCUMENTATION
- [ ] Mini-Lesson Documentation
- Create comic/visual post with embedded runtime game demo
- Portfolio review: Mini-lesson in personal portfolio
- [x] Code Highlights
- Annotate key code snippets in documentation (OOP, APIs, collision)
- Portfolio review: Highlighted code examples with explanations
### Debugging
- [x] Console Debugging
- Use console.log to track game state, variables, method calls
- Code review: Strategic logging in update/collision methods

> Level 1/2: Reveiws
```.js
if (e.key.toLowerCase() === "e") {
    console.log("Entering maze...");
    window.location.href = "timmycounter.html";
}
```
```.js
reaction: function() { 
    if (this.dialogueSystem) { 
        this.showReactionDialogue(); 
    } else { 
        console.log(this.greeting); // Tracks variable state
    } 
},
```
- [x] Hit Box Visualization
- Draw/visualize collision boundaries to refine detection
- Demo: Toggle hit box display, adjust collision rectangles
```.js
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
        visible: false
    }
}));
```
- [ ] Source-Level Debugging
- Set breakpoints in DevTools, step through code execution
- Demo: Use Sources tab to pause and inspect code flow
- [ ] Network Debugging
- Examine Network tab for API calls, CORS errors, response status
- Demo: Inspect fetch requests, response data, error messages
- [ ] Application Debugging
- Examine cookies, localStorage, session data for login/state
- Demo: Application tab inspection of stored data
- [ ] Element Inspection
- Use Element Viewer to inspect canvas, DOM elements, styles
- Demo: Inspect element properties and game object state
### Testing & Verification
- [ ] Gameplay Testing
- Test level completion, character interactions, collision detection
- Live demo: Play through level without critical bugs
- [ ] Integration Testing
- Test API integration (Leaderboard, NPC AI) with live backend
- Demo: Successful score saving and AI responses
- [ ] API Error Handling
- Try/catch blocks for API calls, network error handling
- Code review: Error handling for fetch failures