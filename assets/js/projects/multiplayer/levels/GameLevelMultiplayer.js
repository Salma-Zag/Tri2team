import GameEnvBackground from '/assets/js/GameEnginev1.1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1.1/essentials/Player.js';
import GameObject from '/assets/js/GameEnginev1.1/essentials/GameObject.js';

class RemotePlayerVisualizer extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);
        this.remotePlayersRef = data?.remotePlayers || {};
        this.tagStateRef = data.tagState;
        this.myIdRef = data.myIdRef;
        this.SCALE_FACTOR = 3.5;
        this.frameWidth = 569 / 13;
        this.frameHeight = 36;
        this.spriteImage = null;
    }

    update() {
        if (!this.spriteImage) {
            const img = new Image();
            img.src = "/images/gamebuilder/sprites/kirby.png";
            this.spriteImage = img;
        }
        this.draw();
    }

    draw() {
        if (!this.spriteImage?.complete) return;
        const ctx = this.gameEnv.ctx;
        const drawWidth = this.frameWidth * this.SCALE_FACTOR;
        const drawHeight = this.frameHeight * this.SCALE_FACTOR;

        for (const sid in this.remotePlayersRef) {
            const p = this.remotePlayersRef[sid];
            const isIt = this.tagStateRef.taggerId === sid;

            ctx.drawImage(
                this.spriteImage,
                0, 0,
                this.frameWidth, this.frameHeight,
                p.x, p.y,
                drawWidth, drawHeight
            );

            // Red overlay if this remote player is "it"
            if (isIt) {
                ctx.save();
                ctx.globalAlpha = 0.45;
                ctx.fillStyle = 'red';
                ctx.fillRect(p.x, p.y, drawWidth, drawHeight);
                ctx.restore();

                ctx.save();
                ctx.font = 'bold 14px Arial';
                ctx.fillStyle = 'red';
                ctx.fillText('IT', p.x + drawWidth / 2 - 8, p.y - 6);
                ctx.restore();
            }
        }

        // Draw "IT" label on local player's canvas if they're the tagger
        const myId = this.myIdRef.value;
        if (myId && this.tagStateRef.taggerId === myId) {
            ctx.save();
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = 'red';
            ctx.fillText('YOU ARE IT', 10, 30);
            ctx.restore();
        }
    }

    resize() {}
    destroy() { this.spriteImage = null; }
}

class TagHUD extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);
        this.tagStateRef = data.tagState;
        this.myIdRef = data.myIdRef;
        this._flashStart = null;
        this._wasIt = false;
    }

    update() {
        const isIt = this.tagStateRef.taggerId === this.myIdRef.value;

        // Trigger flash animation when you first become "it"
        if (isIt && !this._wasIt) {
            this._flashStart = Date.now();
        }
        this._wasIt = isIt;

        this.draw();
    }

    draw() {
        const isIt = this.tagStateRef.taggerId === this.myIdRef.value;
        const ctx = this.gameEnv.ctx;
        const W = this.gameEnv.innerWidth;
        const H = this.gameEnv.innerHeight;
        const now = Date.now();

        if (isIt) {
            // Pulsing red border around the screen
            const pulse = 0.5 + 0.5 * Math.sin(now / 300);
            ctx.save();
            ctx.strokeStyle = `rgba(255, 30, 30, ${0.4 + 0.5 * pulse})`;
            ctx.lineWidth = 18;
            ctx.strokeRect(0, 0, W, H);
            ctx.restore();

            // Flash overlay when you first become "it"
            if (this._flashStart) {
                const elapsed = now - this._flashStart;
                const flashDuration = 600;
                if (elapsed < flashDuration) {
                    const alpha = 0.45 * (1 - elapsed / flashDuration);
                    ctx.save();
                    ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
                    ctx.fillRect(0, 0, W, H);
                    ctx.restore();
                } else {
                    this._flashStart = null;
                }
            }

            // "YOU ARE IT" banner
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0); // reset any transforms from other draw calls
            ctx.globalAlpha = 1.0;              // reset alpha in case a previous save left it low
            ctx.globalCompositeOperation = 'source-over';
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'left';             // avoid center alignment clipping issues
            ctx.textBaseline = 'top';

            const text = '👆 YOU ARE IT';
            const textX = W / 2 - 100;         // manual centering
            const textY = 16;

            // Background pill for legibility
            const metrics = ctx.measureText(text);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
            ctx.fillRect(textX - 10, textY - 4, metrics.width + 20, 36);

            // Text
            ctx.fillStyle = '#ff2222';
            ctx.fillText(text, textX, textY);
            ctx.restore();

        } else {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';
            ctx.font = '16px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fillText('✅ safe', W / 2 - 28, 12);
            ctx.restore();
        }
    }

    resize() {}
    destroy() {}
}

class TagCollisionDetector extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);
        this.socket = data.socket;
        this.remotePlayersRef = data.remotePlayers;
        this.tagStateRef = data.tagState;
        this.myIdRef = data.myIdRef;
        this.playerInstance = null;
        this.tagCooldownUntil = 0;
        this.tagCooldownDuration = 2000;

        // Tighter hitbox — treat each player as a small center circle
        // rather than the full sprite rectangle
        this.hitRadius = 30; // pixels, tune this value visually
    }

    _getCenter(x, y, w, h) {
        return {
            cx: x + w / 2,
            cy: y + h / 2
        };
    }

    update() {
        if (!this.playerInstance) {
            this.playerInstance = this.gameEnv?.gameObjects?.find(
                obj => obj instanceof Player
            );
        }
        if (!this.playerInstance) return;

        const myId = this.myIdRef.value;
        if (!myId || this.tagStateRef.taggerId !== myId) return;

        const now = Date.now();
        const onCooldown = now < this.tagCooldownUntil;

        // Get local player center
        const px = this.playerInstance.position?.x ?? this.playerInstance.x;
        const py = this.playerInstance.position?.y ?? this.playerInstance.y;
        const pw = this.playerInstance.width ?? 50;
        const ph = this.playerInstance.height ?? 50;
        const local = this._getCenter(px, py, pw, ph);

        // Shrink remote hitbox to inner 40% of sprite to cut transparent padding
        const spriteW = (569 / 13) * 3.5;
        const spriteH = 36 * 3.5;
        const shrink = 0.2;
        const shrunkW = spriteW * shrink;
        const shrunkH = spriteH * shrink;

        for (const sid in this.remotePlayersRef) {
            const rp = this.remotePlayersRef[sid];

            // Center of the shrunk remote hitbox
            const remote = this._getCenter(
                rp.x + (spriteW - shrunkW) / 2,
                rp.y + (spriteH - shrunkH) / 2,
                shrunkW,
                shrunkH
            );

            // Distance between centers
            const dx = local.cx - remote.cx;
            const dy = local.cy - remote.cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.hitRadius * 2) {
                if (onCooldown) {
                    // Visualize that cooldown is blocking — helps debug
                    console.log(`[TAG] Near ${sid} but on cooldown (${Math.ceil((this.tagCooldownUntil - now) / 1000)}s left)`);
                    continue;
                }

                console.log(`[TAG] Tagged ${sid} at distance ${dist.toFixed(1)}`);
                this.socket.emit("tag", { taggedId: sid });
                this.tagCooldownUntil = now + this.tagCooldownDuration;
                break;
            }
        }
    }

    draw() {}
    resize() {}
    destroy() {}
}

class NetworkSynchronizer extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);
        this.socket = data?.socket;
        this.playerInstance = null;
        this.lastEmit = 0;
        this.emitDelay = 50;
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

class GameLevelMultiplayer {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        const socket = io("ws://localhost:8590", { transports: ["websocket"] });

        const myIdRef = { value: null };
        const remotePlayers = {};
        // tagState is a shared object reference passed into all classes that need it
        const tagState = { taggerId: null };

        socket.on("connect", () => {
            console.log("connected:", socket.id);
            myIdRef.value = socket.id;
        });

        socket.on("player_update", (data) => {
            if (!data?.players) return;
            const players = data.players;

            // Server sends who is "it" alongside positions
            if (data.taggerId !== undefined) {
                tagState.taggerId = data.taggerId;
            }

            for (const sid in players) {
                if (sid === socket.id) continue;
                if (!remotePlayers[sid]) {
                    remotePlayers[sid] = { x: players[sid].x, y: players[sid].y };
                } else {
                    remotePlayers[sid].x = players[sid].x;
                    remotePlayers[sid].y = players[sid].y;
                }
            }

            for (const sid in remotePlayers) {
                if (!players[sid]) delete remotePlayers[sid];
            }
        });

        socket.on("tag_update", (data) => {
            // Dedicated event for tag transfers so it's always up to date
            tagState.taggerId = data.taggerId;
            if (data.taggerId === myIdRef.value) {
                console.log("You are now IT!");
            }
        });

        socket.on("player_left", (data) => {
            delete remotePlayers[data.sid];
            // If the tagger left, server should assign a new one and broadcast tag_update
        });

        socket.on("disconnect", () => {
            console.log("disconnected from server");
        });

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/blackandwhite.jpg",
            pixels: { height: 720, width: 1280 }
        };

        const playerData = {
            id: 'playerData',
            greeting: 'Hi',
            src: '/images/gamebuilder/sprites/kirby.png',
            SCALE_FACTOR: 10,
            STEP_FACTOR: 2800,
            ANIMATION_RATE: 20,
            INIT_POSITION: { x: width * 0.1, y: height * 0.3 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            down: { row: 0, start: 0, columns: 3 },
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 0, start: 0, columns: 3 },
            up: { row: 0, start: 0, columns: 3 },
            upLeft: { row: 1, start: 0, columns: 3 },
            upRight: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 },
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: NetworkSynchronizer, data: { socket } },
            { class: TagCollisionDetector, data: { socket, remotePlayers, tagState, myIdRef } },
            { class: RemotePlayerVisualizer, data: { remotePlayers, tagState, myIdRef } },
             { class: TagHUD, data: { tagState, myIdRef } },
        ];
    }
}

export default GameLevelMultiplayer;