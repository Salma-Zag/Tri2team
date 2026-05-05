---
layout: post
codemirror: True
title: Sprint 5 Integration Blog
permalink: /Integration-Blog
author: Sophie Haas and Salma Zahgloul
---
## Starting Out
Our initial plan was to just attempt to implement gravity into our current Multiplayer game using our sever, but we realized integrating one lesson wouldn't be enough. So, we decided to also attempt to add a <strong>'character customization'</strong> area for our players. Our players can change their sprites and feel more attatched to the game using gravity. Now, it was time to figure out <strong> how </strong> we would do this.

## Brainstorm/Ideation
### Platformer (Gravity)
In our multiplayer game, we thought it would be difficult to implement gravity into our game; we then realized that it is very simple. Using syncronizing screens, or the NetworkSychronizer class, this constantly searches for the players location using its x and y coordinates. 

If a player moves down using S or the down arrow key, the computer tracks it and stamps the player image over where the player is (updated every 50 milliseconds). So if a player on another device can see up and down movements, it shouldn't be too different from gravity. The update() would just need to emit at a faster speed to make the player feel as if they were falling.

```js
class NetworkSynchronizer extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);
        this.socket = data?.socket; // Establishes Socket.IO connection
        this.playerInstance = null; // References the local player
        this.lastEmit = 0; // Little timestamps between emits, to prevent constant emission
        this.emitDelay = 50; // Time (in ms) between delays
    }

    update() {
        if (!this.playerInstance) {
            this.playerInstance = this.gameEnv?.gameObjects?.find(
                obj => obj instanceof Player
            );
        }

        if (!this.playerInstance || !this.socket) return;

        const now = Date.now();
        if (now - this.lastEmit < this.emitDelay) return;

        this.socket.emit("move", {
            x: this.playerInstance.position?.x ?? this.playerInstance.x,
            y: this.playerInstance.position?.y ?? this.playerInstance.y
    });    
    this.lastEmit = now;
 
    }

    draw() {}
    resize() {}
    destroy() {}
}
```
### Character Customization (Character Swap)