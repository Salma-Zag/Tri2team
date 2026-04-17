---
layout: post 
title: Sprint 5 Assessments
permalink: /sprintfive
hide: true
show_reading_time: false
---

<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Bungee&display=swap');

    /* Global Page Overrides */
    .post {
        background-color: #0f0f0f;
        color: #f0f0f0; 
        font-family: 'Orbitron', sans-serif;
        padding: 40px 20px;
        min-height: 100vh;
    }

    /* Styling for the intro text */
    .dashboard-intro {
        font-family: 'Orbitron', sans-serif;
        font-weight: 500;
        font-size: 1rem;
        color: #bbb;
        margin-bottom: 30px;
        letter-spacing: 0.5px;
        line-height: 1.8;
        border-bottom: 1px solid #333;
        padding-bottom: 25px;
    }

    .system-label {
        color: #00d4ff;
        font-weight: 700;
        text-transform: uppercase;
        display: block;
        margin-bottom: 10px;
        font-size: 1.2rem;
    }

    /* Level Highlight Tags */
    .level-tag {
        color: #00d4ff;
        background: rgba(0, 212, 255, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: 'Bungee', cursive;
        font-size: 0.8rem;
    }

    h1, h2, h3 {
        font-family: 'Bungee', cursive;
        color: #ff0000;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    h2 {
        border-left: 5px solid #ff0000;
        padding-left: 15px;
        margin-top: 40px;
    }

    /* Container for the button grid */
    .grid-container {
        display: flex; 
        flex-wrap: wrap; 
        gap: 15px;
        margin-bottom: 30px;
    }

    /* The Racing Button Style */
    .race-button {
        display: inline-block;
        text-decoration: none;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .race-button div {
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.9rem;
        font-family: 'Bungee', cursive;
        border: 2px solid rgba(255,255,255,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 220px;
        text-align: center;
        color: white;
    }

    /* Hover Effects */
    .race-button:hover {
        transform: translateY(-5px) skew(-5deg);
    }

    /* Color Variants */
    .btn-red { background: linear-gradient(45deg, #c51d1d, #ff3131); box-shadow: 0 4px 15px rgba(197, 29, 29, 0.4); }
    .btn-blue { background: linear-gradient(45deg, #005f73, #00d4ff); box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4); }
    .btn-dark { background: linear-gradient(45deg, #4a0b0b, #220505); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6); border: 1px solid #ff0000 !important;}

    /* Content styling */
    .blog-content {
        background: rgba(255, 255, 255, 0.03);
        padding: 30px;
        border-radius: 12px;
        border: 1px solid #333;
        line-height: 1.6;
    }

    .blog-content img {
        border: 2px solid #444;
        border-radius: 8px;
        margin: 10px 0;
    }
</style>

<div class="dashboard-intro">
    <span class="system-label">Team Briefing // Sprint 5</span>
    Welcome to the multiplayer development hub. We are currently architecting a real-time synchronized environment inspired by <strong>Among Us</strong> and <strong>Together</strong>.
    <br><br>
    <strong>SYSTEM STATUS:</strong><br>
    <span class="level-tag">Network</span> Socket.io Integration (Pending)<br>
    <span class="level-tag">Backend</span> Flask Authoritative Server<br>
    <span class="level-tag">Logic</span> Velocity-based Gravity Stacking
</div>

<h2>Project Access</h2>
<div class="grid-container">
    <a href="{{site.baseurl}}/gamify/multiplayer" class="race-button">
        <div class="btn-red">Live Multiplayer Game</div>
    </a>
    <a href="https://github.com/Salma-Zag/Tri2team" class="race-button">
        <div class="btn-blue">Frontend Repo</div>
    </a>
    <a href="https://github.com/TDWolff/flask" class="race-button">
        <div class="btn-dark">Backend Repo</div>
    </a>
</div>

<div class="blog-content">

 <span class="level-tag">Project Overview</span>
We are developing a multiplayer web-based game inspired by the games <strong> Among Us </strong> and <strong> Together (in roblox) </strong>.

<div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <img width="48%" alt="Inspiration 1" src="https://github.com/user-attachments/assets/d3a8a1c3-09c8-4367-b28a-9cf85c7a49db" />
    <img width="48%" alt="Inspiration 2" src="https://github.com/user-attachments/assets/4e249226-7f7c-4f2f-93c5-6849d31e4720" />
</div>

<span class="level-tag">We plan to combine fun, multiplayer game levels that implement lobbies while simultaneously implementing the teamwork aspect of our multiplayer game! </span>
The core gameplay involves players navigating levels as customizable cubes, featuring gravity-based movement and real-time synchronization.

<span class="level-tag">Resources</span>
<strong> Backend Repo: </strong> [TDWolff/flask](https://github.com/TDWolff/flask)
* **Frontend Repo:** [Salma-Zag/Tri2team](https://github.com/Salma-Zag/Tri2team)
* **Reference Document:** [Multiplayer Game Loop Rubric](https://pages.opencodingsociety.com/2025/01/15/CSSE_game_over_IPYNB_2_.html)
* **Brainstorming/Planning:** [Ideation Document](https://docs.google.com/document/d/1ZCdYbzZ6DTbXBwnawsfMCg9TeT4FzVzlmvFETTRZnL8/edit?tab=t.0)

### Tech Stack
* **Frontend:** JavaScript (GameEnginev1), Socket.io Client
* **Backend:** Flask-SocketIO (Python)
* **Deployment:** GitHub Pages (Frontend) / Flask (Backend Server)

## Planned Features
### Lobby and Matchmaking
- [ ] **Join Codes:** Implementation of a 6-letter room code system for private/public lobbies.
- [ ] **Player Limits:** Logic to enforce a minimum of 2 players and a maximum of 4 per session.
- [ ] **The Waiting Room:** A pre-game scene where players can chat and customize their "Cube."
- [ ] **Customization:** UI for changing cube colors/skins before the game starts.

## Example Inspiration (Among Us)
<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
    <img width="30%" alt="Inspo 1" src="https://github.com/user-attachments/assets/885c3c16-0e97-4b3b-a6fc-3e40df1f08cd" />
    <img height="200" alt="Inspo 2" src="https://github.com/user-attachments/assets/ed58512c-7c81-4d3f-a850-6bdc6663f346" />
    <img width="30%" alt="Inspo 3" src="https://github.com/user-attachments/assets/6783219a-ecb2-4b44-b286-5d97bb911755" />
</div>

### Gameplay Mechanics
- [ ] **Movement Logic:** Jump physics with velocity and gravity-based stacking mechanics.
- [ ] **Level Design:** At least two distinct levels with varying platform configurations.
- [ ] **Game State Transition:** Implementing the "Page between lobby and game" transition.
- [ ] **Social:** In-game player messaging system (chat box).
- [ ] **Pause Menu:** Options for rules, music toggles, and game settings.

## Technical Requirements
### Networking and Sync
* **WebSocket Integration:** Establish bi-directional communication using `socket.io`.
* **Authoritative Server:** The Flask server will maintain the "Truth" (positions, scores, and health).
* **JSON Serialization:** Efficient transmission of GameObject data (velocity, coordinates).
* **The Game Loop:** Modify client-side loops to interpolate server updates to prevent "teleporting."

### Data Management
* **Player Identification:** Assign unique IDs to each socket connection.
* **State Tracking:** Server-side tracking of Positions, Velocities, Game Clock, and Level Gravity.
* **Error Handling:** Implementation of "reconnect" logic for network stability.

## Our Success Plans
1.  A player can host a game and receive a code.
2.  More players can join by using that code.
3.  Both players can see each other move in real-time with synchronized physics.
4.  **Teamwork Stacking:** Players can interact (stacking characters) to solve levels.
5.  **Character Skins:** Lobby customization (tints, colors, potential hats).

</div>