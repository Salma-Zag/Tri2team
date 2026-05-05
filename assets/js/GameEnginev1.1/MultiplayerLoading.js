import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import GameObject from '/assets/js/GameEnginev1/essentials/GameObject.js';

// ... (RemotePlayerVisualizer and NetworkSynchronizer classes remain the same) ...

class GameLevelMultiplayer {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const socket = io("ws://localhost:8590", { transports: ["websocket"] });
        let myId = null;
        const remotePlayers = {};

        // --- 1. SETUP GAME DATA ---
        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/blackandwhite.jpg",
            pixels: { height: 720, width: 1280 }
        };

        const playerData = {
            id: "playerData",
            src: path + "/images/gamebuilder/sprites/kirby.png",
            // ... (keep all your existing playerData properties here)
            spriteOptions: [
                { name: 'Kirby', src: path + "/images/gamebuilder/sprites/kirby.png", /*...*/ },
                { name: 'Man', src: path + "/images/gamebuilder/sprites/man.png", /*...*/ },
                { name: 'Slime', src: path + "/images/gamebuilder/sprites/slime.png", /*...*/ },
                { name: 'BattleBus', src: path + "/images/gamebuilder/sprites/battlebus.png", /*...*/ }
            ]
        };

        // --- 2. CREATE THE UI LAYERS ---

        // Welcome/Lore Screen
        const welcomeScreen = document.createElement('div');
        welcomeScreen.id = 'welcome-screen';
        Object.assign(welcomeScreen.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            background: 'radial-gradient(circle, #1a1a1a 0%, #000000 100%)',
            color: '#e2e8f0', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', zIndex: '10001', textAlign: 'center'
        });
        welcomeScreen.innerHTML = `
            <h1 style="font-family: 'Courier New', monospace; color: #ff0000; text-shadow: 2px 2px #550000;">THE ARENA</h1>
            <p style="max-width: 600px; font-size: 1.2rem; font-style: italic;">
                The underground calls. Two enter, one leaves. This isn't just tag... it's survival.
            </p>
            <button id="start-btn" style="padding: 1rem 2rem; background: #ce1212; color: white; border: none; cursor: pointer; font-size: 1.5rem; margin-top: 2rem; border-radius: 4px;">ENTER THE CLUB</button>
        `;

        // Character Selection Menu
        const charMenu = document.createElement('div');
        charMenu.id = 'char-selection-menu';
        Object.assign(charMenu.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            background: 'rgba(0, 0, 0, 0.9)', color: 'white', display: 'none',
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: '10002'
        });
        
        charMenu.innerHTML = `<h2>SELECT YOUR FIGHTER</h2><div id="char-buttons"></div>`;
        const charButtonsContainer = charMenu.querySelector('#char-buttons');

        // The "FIGHT" Button (Hidden until character is picked)
        const fightBtn = document.createElement('button');
        fightBtn.textContent = 'FIGHT';
        Object.assign(fightBtn.style, {
            display: 'none', marginTop: '30px', padding: '15px 50px',
            background: 'linear-gradient(to bottom, #ff4b2b, #ff416c)',
            color: 'white', fontSize: '2rem', fontWeight: 'bold', border: 'none',
            borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 20px #ff4b2b'
        });

        // --- 3. LOGIC & EVENTS ---

        // Populate Character Buttons
        playerData.spriteOptions.forEach((option) => {
            const btn = document.createElement('button');
            btn.textContent = option.name;
            Object.assign(btn.style, { margin: '10px', padding: '10px 20px', cursor: 'pointer' });
            
            btn.onclick = () => {
                // Update player data preview (Optional: you could show a preview image here)
                playerData.src = option.src; // Set chosen sprite
                console.log("Selected:", option.name);
                
                // Show the Fight button once a choice is made
                fightBtn.style.display = 'block';
                
                // Highlight selection
                Array.from(charButtonsContainer.children).forEach(b => b.style.border = "none");
                btn.style.border = "2px solid red";
            };
            charButtonsContainer.appendChild(btn);
        });
        charMenu.appendChild(fightBtn);

        // Navigation Flow
        document.body.appendChild(welcomeScreen);
        document.body.appendChild(charMenu);

        document.getElementById('start-btn').onclick = () => {
            welcomeScreen.style.display = 'none';
            charMenu.style.display = 'flex';
        };

        // START THE ACTUAL GAME
        fightBtn.onclick = () => {
            charMenu.style.display = 'none';
            
            // Initialize the game objects only after FIGHT is clicked
            this.classes = [
                { class: GameEnvBackground, data: bgData },
                { class: Player, data: playerData },
                { class: NetworkSynchronizer, data: { socket: socket } },
                { class: RemotePlayerVisualizer, data: { remotePlayers: remotePlayers } }
            ];

            // Trigger the level load in your engine
            gameEnv.loadLevel(this); 
        };

        // --- 4. NETWORK SETUP --- (Keep existing socket listeners)
        socket.on("connect", () => { myId = socket.id; });
        // ... (Keep player_update and player_left listeners)
    }

    getRandomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

export default GameLevelMultiplayer;